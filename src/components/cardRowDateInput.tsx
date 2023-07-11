import { useEffect, useState } from 'react'
import { Libre_Franklin } from 'next/font/google'
import styles from './card.module.css'

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
})

interface CardRowDateInputProps {
	label: string,
	value: Date,
	min?: string | number | undefined,
	onSave?: (newValue: Date) => void,
}

function CardRowDateInput(props: CardRowDateInputProps) {
	const { label, value, min, onSave, } = props
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [newValue, setNewValue] = useState<Date>(value)
	const [displayedDateValue, setDisplayedDateValue] = useState<string>()
	const [editableDateValue, setEditableDateValue] = useState<string>()

	const editValue = () => {
		setNewValue(value)
		setIsEditing(true)
	}

	const saveValue = () => {
		// When it saves the date, the server will receive the internal UTC date correctly
		if (onSave) onSave(newValue)
		setIsEditing(false)
	}

	const cancel = () => {
		setNewValue(value)
		setIsEditing(false)
	}

	const getEditableDateValue = (dateValue: Date) => {
		const year = dateValue.toLocaleDateString("en-US", { year: "numeric" })
		const month = dateValue.toLocaleDateString("en-US", { month: "2-digit" })
		const day = dateValue.toLocaleDateString("en-US", { day: "2-digit" })

		return `${year}-${month}-${day}`
	}

	const getDisplayedDateValue = (dateValue: Date) => {
		return dateValue.toDateString()
	}

	const onChange = (evt: any) => {
		const value = evt?.nativeEvent?.target?.value || ''
		const today = new Date()
		const newDatevalue = value ? new Date(value) : today
		// input type=date internally works with UTC, so it considers the selected date as UTC
		// then it calculates the local date from it
		// so we need to apply the time zone offset to the selected date to convert it to local time
		// When it saves the date, the server will receive the UTC date correctly
		newDatevalue.setMinutes(newDatevalue.getTimezoneOffset())

		// if it is today we need to set the current time in order to get the correct date in server side
		// it could be a different date in Greenwich (UTC)
		if (newDatevalue.toDateString() === today.toDateString()) newDatevalue.setTime(today.getTime())

		setNewValue(newDatevalue)
		setDisplayedDateValue(getDisplayedDateValue(newDatevalue))
		setEditableDateValue(getEditableDateValue(newDatevalue))
	}

	useEffect(() => {
		const newDatevalue = value ? new Date(newValue) : new Date()
		// dates come from the server (DB) in local time, it applies the time zone offset automatically
		setDisplayedDateValue(getDisplayedDateValue(newDatevalue))
		setEditableDateValue(getEditableDateValue(newDatevalue))
	}, [])
	
  return (
		<div className={`${styles.cardRowContainer} ${libreFranklin.className}`}>
			<div className={styles.cardColumn} style={{ width: '40%' }}>
				<span className={styles.cardLabel}>{label}:</span>
			</div>
			<div className={styles.cardColumn} style={{ width: '60%' }}>
				{
					!isEditing ?
					<>
						<span className={styles.cardValue}>{displayedDateValue}</span>
						<span className={styles.cardValueEditLink} onClick={editValue}>Edit</span>
					</>
					: 
					<>
						<input className={`${styles.cardValueInput} ${libreFranklin.className}`}
							type={'date'}
							value={editableDateValue}
							onChange={onChange}
							min={min}
						/>
						<button className={styles.cardValueButton} onClick={saveValue}>Save</button>
						<button className={styles.cardValueButton} onClick={cancel}>Cancel</button>
					</>
				}
			</div>
		</div>
  )
}

export default CardRowDateInput
