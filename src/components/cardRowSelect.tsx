
import { useState } from 'react'
import { Libre_Franklin } from 'next/font/google'
import styles from './card.module.css'

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
})

interface CardRowSelectProps {
	label: string,
	value: string | number,
	options: { id: number, description: string }[],
	onSave?: (newValue: number | string) => void,
}

function CardRowSelect(props: CardRowSelectProps) {
	const { label, value, onSave, options } = props
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
		let value = evt?.nativeEvent?.target?.value || ''
		setNewValue(value)
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
						<span className={styles.cardValue}>{options.find(op => op.id === value)?.description || ''}</span>
						<span className={styles.cardValueEditLink} onClick={editValue}>Edit</span>
					</>
					: 
					<>
            <select className={styles.cardValueDropDown}
              value={newValue}
              onChange={onChange}
            >
              { options.map(option =>
                <option key={option.id} value={option.id}>{option.description}</option>
              ) }
            </select>
						<button className={styles.cardValueButton} onClick={saveValue}>Save</button>
						<button className={styles.cardValueButton} onClick={cancel}>Cancel</button>
					</>
				}
			</div>
		</div>
  )
}

export default CardRowSelect
