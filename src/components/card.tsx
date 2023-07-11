
import { Interval, Subscription } from '../types'
import styles from './card.module.css'
import CardRowTextInput from './cardRowTextInput'
import CardRowDateInput from './cardRowDateInput'
import CardRowSelect from './cardRowSelect'
import { useState } from 'react'
import { getPaymentMethod } from '../helper'

interface CardProps {
	/**
   * Subscription object
   */
	subscription: Subscription,
	/**
   * Interval options array
   */
	intervals: Interval[],
	/**
   * Function to trigger when save button in clicked
   */
	onSave: (subscription: Subscription) => Promise<boolean>,
	/**
   * Flag to show or hide the card
   */
	visible: boolean,
}

function Card(props: CardProps) {
	const { subscription, intervals, onSave, visible } = props
	const firstDonationDate = new Date(subscription.firstDonationDate)
	const [isSaving, setIsSaving] = useState<boolean>(false)
	const [errorSaving, setErrorSaving] = useState<boolean>(false)

	const saveSubscription = async (payload: Subscription) => {
		setIsSaving(true)
		const res = await onSave(payload)
		const savedOk = res
		if (savedOk) setIsSaving(false)
		else setErrorSaving(true)
	}

	const totalDonated = !subscription.totalDonated
		? '$0'
		: `$${subscription.totalDonated} ${firstDonationDate ? `since ${firstDonationDate.toLocaleDateString('en-US', { year:"numeric", month:"short", day:"numeric"})}` : ''}`
	
	const paymentMethod = getPaymentMethod(subscription)

	const cardContent = <>
		<CardRowTextInput
			label='Amount'
			value={subscription.amount}
			onSave={(newValue: number | string) => saveSubscription(
				{
					...subscription,
					amount: isNaN(newValue as any) ? subscription.amount : parseFloat(newValue.toString())
				}
			)}
			isCurrency
		/>
		<CardRowSelect
			label='Interval'
			value={subscription.interval?.id}
			onSave={(newValue: number | string) => {
				const intervalId = parseInt(newValue.toString())
				saveSubscription(
					{
						...subscription,
						interval: {
							id: intervalId,
							description: intervals?.find(inter => inter.id === intervalId)?.description || ''
						}
					}
				)}
			}
			options={intervals}
		/>
		<CardRowDateInput
			label='Next donation'
			value={subscription.nextDonation}
			onSave={(newValue: Date) => saveSubscription(
				{
					...subscription,
					nextDonation: newValue
				}
			)}
			min={new Date().toISOString().split("T")[0]}
		/>
		<CardRowTextInput label='Payment method'
			value={paymentMethod.description}
			editable={false}
			icon={paymentMethod.icon}
		/>
		<CardRowTextInput label='Total donated' value={totalDonated} editable={false} />
	</>

	let displayedContent = cardContent
	if (isSaving) displayedContent = <div className={styles.cardMessageContainer}><span>saving...</span></div>
	if (errorSaving) displayedContent = <div className={styles.cardMessageContainer}><span>error saving</span></div>

  return (
		<div className={styles.cardContainer} style={{ display: visible ? 'flex' : 'none '}}>
			{displayedContent}
		</div>
  )
}

export default Card
