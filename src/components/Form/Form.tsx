import React, { FC } from 'react'

interface IForm {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	inputValue: string
	type: 'user' | 'repo'
}

const Form: FC<IForm> = ({
	handleInputChange,
	handleSelectChange,
	handleSubmit,
	inputValue,
	type,
}) => {
	return (
		<form
			onSubmit={handleSubmit}
			style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
		>
			<input
				type='text'
				value={inputValue}
				onChange={handleInputChange}
				placeholder='Введите GitHub имя пользователя или репозиторий'
			/>
			<select value={type} onChange={handleSelectChange}>
				<option value='user'>Пользователь</option>
				<option value='repo'>Репозиторий</option>
			</select>
			<button type='submit'>Отправить</button>
		</form>
	)
}

export default Form
