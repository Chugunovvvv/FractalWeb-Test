import { FC } from 'react'

interface IRepoInfo {
	data: { full_name: string; stargazers_count: number }
}

const RepoInfo: FC<IRepoInfo> = ({ data }) => {
	return (
		<div>
			<h3>Информация о репозитории</h3>
			<p>Полное имя: {data.full_name || 'Нет названия'}</p>
			<p>Количество звезд: {data.stargazers_count || 'Нет звезд'}</p>
		</div>
	)
}

export default RepoInfo
