import { v4 as uuidv4 } from 'uuid'

export default class ApiService {
	getSearchId = async () => {
		const response = await fetch(
			'https://aviasales-test-api.kata.academy/search'
		)
		const data = await response.json()
		return data.searchId
	}

	getTicketsPack = async searchId => {
		const response = await fetch(
			`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
		)
		const data = await response.json()
		data.tickets.forEach(el => (el.id = uuidv4()))
		return data
	}
}
