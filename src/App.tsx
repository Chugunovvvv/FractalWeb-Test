import React, { FC, useState } from 'react'
import Form from './components/Form/Form'
import RepoInfo from './components/RepoInfo/RepoInfo'
import UserInfo from './components/UserInfo/UserInfo'

import './App.css'

type User = {
	name: string
	public_repos: number
	[key: string]: any
}

type Repo = {
	full_name: string
	stargazers_count: number
	[key: string]: any
}

type ApiResponse = User | Repo

const App: FC = () => {
	const [inputValue, setInputValue] = useState<string>('')
	const [type, setType] = useState<'user' | 'repo'>('user')
	const [data, setData] = useState<ApiResponse | null>(null)
	const [error, setError] = useState<string>('')

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setType(e.target.value as 'user' | 'repo')
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError('')
		setData(null)

		try {
			const endpoint =
				type === 'user'
					? `https://api.github.com/users/${inputValue}`
					: `https://api.github.com/repos/${inputValue}`

			const response = await fetch(endpoint)

			if (!response.ok) {
				console.log(response)
				if (response.status === 404) {
					throw new Error('Not Found')
				} else {
					throw new Error('Failed to fetch data')
				}
			}

			const data: ApiResponse = await response.json()
			setData(data)
		} catch (err) {
			if (err instanceof Error) {
				if (err.message === 'Not Found') {
					setError('Проверьте правильность введенных данных')
				} else {
					setError(
						'Не удалось получить данные. Пожалуйста, проверьте введенные данные и попробуйте снова.'
					)
				}
			}
		}
	}

	return (
		<div>
			<Form
				handleInputChange={handleInputChange}
				handleSelectChange={handleSelectChange}
				handleSubmit={handleSubmit}
				inputValue={inputValue}
				type={type}
			/>
			{error && <p>{error}</p>}

			{data && type === 'user' && <UserInfo data={data as User} />}

			{data && type === 'repo' && <RepoInfo data={data as Repo} />}
		</div>
	)
}

export default App
