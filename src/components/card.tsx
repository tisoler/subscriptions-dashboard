'use client';
import styled from 'styled-components'
import { CARD_LABEL_COLOR, CARD_LINK_COLOR, INTERVAL_VALUES } from '../constants';
import { Subscription } from '@/types';
import { useState } from 'react';

interface CardRowProps {
	label: string,
	value: string | number,
	onSave?: (newValue: number | string) => void,
	editable?: boolean,
	isCurrency?: boolean,
	options?: string[]
	isDate?: boolean
}

interface CardProps {
	subscription: Subscription,
	onSave: (subscription: Subscription) => void,
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
		<CardRowContainer>
			<CardColumn>
				<CardLabel>{label}:</CardLabel>
			</CardColumn>
			<CardColumn columnwidth={60}>
				{
					!isEditing ?
					<>
						<CardValue>{`${isCurrency ? '$' : ''}${displayValue}`}</CardValue>
						{ editable && <CardValueEditLink onClick={editValue}>Edit</CardValueEditLink> }
					</>
					: 
					<>
						{ options?.length
								? (
									<CardValueDropDown
										value={`${isCurrency ? '$' : ''}${newValue}`}
										onChange={onChange}
									>
										{ options.map(option => <option key={option}>{option}</option>) }
									</CardValueDropDown>
								)
								: (
									<CardValueInput
										type={isDate ? 'date' : 'text'}
										value={`${isCurrency ? '$' : ''}${editableValue}`}
										onChange={onChange}
									/>
								)
						}
						<CardValueButton onClick={saveValue}>Save</CardValueButton>
						<CardValueButton onClick={cancel}>Cancel</CardValueButton>
					</>
				}
			</CardColumn>
		</CardRowContainer>
  )
}

export default function Card(props: CardProps) {
	const { subscription, onSave } = props
	const totalDonated = !subscription.totalDonated
		? '$0'
		: `$${subscription.totalDonated} since ${new Date(subscription.firstDonation).toLocaleDateString('en-US', { year:"numeric", month:"short", day:"numeric"})}`

  return (
		<CardContainer>
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
				value={subscription.interval}
				onSave={(newValue: number | string) => onSave(
					{
						...subscription,
						interval: newValue.toString()
					}
				)}
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
			<CardRow label='Payment method' value={subscription.paymentMethod} editable={false}></CardRow>
			<CardRow label='Total donated' value={totalDonated} editable={false}></CardRow>
		</CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 582px;
  height: 288px;
  border-radius: 8px;
  padding: 2rem 2rem;
  background-color: #fff;
	margin-bottom: 15px;
	box-shadow: 0px 2px 2px 0px #0000001F;
	font-family: Libre Franklin;
  font-size: 16px;
`

const CardRowContainer = styled.div`
  display: flex;
	align-items: center;
	height: 40px;
  width: 100%;
`

const CardColumn = styled.div<{ columnwidth?: number }>`
  display: flex;
  justify-content: flex-start;
  width: ${props => props.columnwidth ?? 40}%;
`

const CardLabel = styled.span`
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  color: ${CARD_LABEL_COLOR}
  margin-right: 
`

const CardValue = styled.span`
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  color: ${CARD_LABEL_COLOR}
`

const CardValueEditLink = styled.span`
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  color: ${CARD_LINK_COLOR};
  text-decoration: underline;
  cursor: pointer;
  margin-left: 5px;
`

const CardValueDropDown = styled.select`
	width: 172px;
	height: 40px;
	border-radius: 4px;
	border: 1px;
	linear-gradient(0deg, #FFFFFF, #FFFFFF);
	border: 1px solid #A6A6A6;
	padding-left: 10px;
  font-size: 16px;
`

const CardValueInput = styled.input`
	width: 172px;
	height: 40px;
	border-radius: 4px;
	border: 1px;
	linear-gradient(0deg, #FFFFFF, #FFFFFF);
	border: 1px solid #A6A6A6;
	padding-left: 10px;
  font-size: 16px;
`

const CardValueButton = styled.button`
	width: 60px;
	height: 40px;
	border-radius: 4px;
	font-size: 14px;
	font-weight: 600;
	line-height: 21px;
	letter-spacing: 0px;
	text-align: center;
	background-color: #5DB9FE;
	border: none;
	margin-left: 5px;
	cursor: pointer;
	color: #fff;
`
