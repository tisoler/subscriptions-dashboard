'use client'

import { INTERVAL_VALUES } from '../constants'
import { Subscription } from '@/types'
import { useState } from 'react'
import { Libre_Franklin } from 'next/font/google'
import styles from './card.module.css'

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
})

interface CardRowProps {
	label: string,
	value: string | number,
	onSave?: (newValue: number | string) => void,
	editable?: boolean,
	isCurrency?: boolean,
	options?: { id: number, description: string }[]
	isDate?: boolean
}

function CardRow(props: CardRowProps) {
	const { label, value, onSave, editable = true, isCurrency = false, options, isDate = false } = props
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [newValue, setNewValue] = useState<number | string>(value)

	const editValue = () => {
		setNewValue(value)
		setIsEditing(true)
	}

	const saveValue = () => {
		if (onSave) onSave(newValue)
		setIsEditing(false)
	}

	const cancel = () => {
		setNewValue(value)
		setIsEditing(false)
	}

	const onChange = (evt: any) => {
		let value = (isDate ? evt?.nativeEvent?.target?.value : evt?.target?.value.replaceAll('$', '')) || ''
		if (isDate && value) {
			// input type=date retrieves locales date, here it coverts the date to UTC.
			value = new Date(value)
			value.setMinutes(value.getMinutes() + value.getTimezoneOffset())
		}
		setNewValue(value)
	}

	const displayValue = !isDate || !value ? value : new Date(value).toLocaleDateString('en-US', { year:"numeric", month:"short", day:"numeric"})

	let editableValue = newValue
	if (isDate && newValue) {
		const getYear = new Date(newValue).toLocaleDateString("en-US", { year: "numeric" })
		const getMonth = new Date(newValue).toLocaleDateString("en-US", { month: "2-digit" })
		const getDay = new Date(newValue).toLocaleDateString("en-US", { day: "2-digit" })
		editableValue = getYear + "-" + getMonth + "-" + getDay
	}
	
  return (
		<div className={`${styles.cardRowContainer} ${libreFranklin.className}`}>
			<div className={styles.cardColumn} style={{ width: '40%' }}>
				<span className={styles.cardLabel}>{label}:</span>
			</div>
			<div className={styles.cardColumn} style={{ width: '60%' }}>
				{
					!isEditing ?
					<>
						<span className={styles.cardValue}>{`${isCurrency ? '$' : ''}${displayValue}`}</span>
						{ editable && <span className={styles.cardValueEditLink} onClick={editValue}>Edit</span> }
					</>
					: 
					<>
						{ options?.length
								? (
									<select className={styles.cardValueDropDown}
										value={`${isCurrency ? '$' : ''}${newValue}`}
										onChange={onChange}
									>
										{ options.map(option =>
											<option key={option.id} value={option.id}>{option.description}</option>
										) }
									</select>
								)
								: (
									<input className={`${styles.cardValueInput} ${libreFranklin.className}`}
										type={isDate ? 'date' : 'text'}
										value={`${isCurrency ? '$' : ''}${editableValue}`}
										onChange={onChange}
									/>
								)
						}
						<button className={styles.cardValueButton} onClick={saveValue}>Save</button>
						<button className={styles.cardValueButton} onClick={cancel}>Cancel</button>
					</>
				}
			</div>
		</div>
  )
}

interface CardProps {
	subscription: Subscription,
	onSave: (subscription: Subscription) => void,
	visible: boolean,
}

export default function Card(props: CardProps) {
	const { subscription, onSave, visible } = props
	const totalDonated = !subscription.totalDonated
		? '$0'
		: `$${subscription.totalDonated} since ${new Date(subscription.firstDonation).toLocaleDateString('en-US', { year:"numeric", month:"short", day:"numeric"})}`

  return (
		<div className={styles.cardContainer} style={{ display: visible ? 'flex' : 'none '}}>
			<CardRow
				label='Amount'
				value={subscription.amount}
				onSave={(newValue: number | string) => onSave(
					{
						...subscription,
						amount: isNaN(newValue as any) ? subscription.amount : parseFloat(newValue.toString())
					}
				)}
				isCurrency
			/>
			<CardRow
				label='Interval'
				value={subscription.interval?.description}
				onSave={(newValue: number | string) => {
					const intervalId = parseInt(newValue.toString())
					onSave(
						{
							...subscription,
							interval: {
								id: intervalId,
								description: INTERVAL_VALUES.find(inter => inter.id === intervalId)?.description || ''
							}
						}
					)}
				}
				options={INTERVAL_VALUES}
			/>
			<CardRow
				label='Next donation'
				value={subscription.nextDonation}
				onSave={(newValue: number | string) => onSave(
					{
						...subscription,
						nextDonation: newValue.toString()
					}
				)}
				isDate
			/>
			<CardRow label='Payment method' value={subscription.paymentMethod?.description} editable={false}></CardRow>
			<CardRow label='Total donated' value={totalDonated} editable={false}></CardRow>
		</div>
  )
}
