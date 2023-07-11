import { ReactElement, useState } from 'react'
import { Libre_Franklin } from 'next/font/google'
import styles from './card.module.css'

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
})

interface CardRowTextInputProps {
	label: string,
	value: string | number,
	onSave?: (newValue: number | string) => void,
	editable?: boolean,
	isCurrency?: boolean,
	icon?: ReactElement | null,
}

function CardRowTextInput(props: CardRowTextInputProps) {
	const { label, value, onSave, editable = true, isCurrency = false, icon, } = props
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
		let value = evt?.target?.value.replaceAll('$', '') || ''
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
						{ icon && icon }
						<span className={styles.cardValue}>{`${isCurrency ? '$' : ''}${value}`}</span>
						{ editable && <span className={styles.cardValueEditLink} onClick={editValue}>Edit</span> }
					</>
					: 
					<>
						<input className={`${styles.cardValueInput} ${libreFranklin.className}`}
							type={'text'}
							value={`${isCurrency ? '$' : ''}${newValue}`}
							onChange={onChange}
						/>
						<button className={styles.cardValueButton} onClick={saveValue}>Save</button>
						<button className={styles.cardValueButton} onClick={cancel}>Cancel</button>
					</>
				}
			</div>
		</div>
  )
}

export default CardRowTextInput
