import { FC } from 'react'

interface IUserInfo {
	data: { name: string; public_repos: number }
}

const UserInfo: FC<IUserInfo> = ({ data }) => {
	return (
		<div>
			<h3>Информация о пользователе</h3>
			<p>Полное имя: {data.name || 'Нет имени'}</p>
			<p>
				Количество публичных репозиториев:{' '}
				{data.public_repos || 'Нет публичных репозиториев'}
			</p>
		</div>
	)
}

export default UserInfo
