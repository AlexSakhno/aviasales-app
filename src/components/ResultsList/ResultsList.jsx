import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes, { bool } from 'prop-types'
import { Alert } from 'antd'
import { Spin } from 'antd'
import ResultsItem from '../ResultItem/ResultItem'
import classes from './ResultsList.module.scss'

function ResultsList({ tickets, filter, sort }) {
	const [displayTickets, setDisplayTickets] = useState(5)

	const filteredList = tickets.filter(ticket => {
		if (filter.ALL) return true
		const stopsThere = ticket.segments[0].stops.length
		const stopsBack = ticket.segments[1].stops.length
		return Object.keys(filter).some(
			el => filter[el] && (stopsThere === +el[0] || stopsBack === +el[0])
		)
	})

	const sortValue = {
		FAST: (prev, next) =>
			prev.segments.reduce((acc, el) => el.duration + acc, 0) -
			next.segments.reduce((acc, el) => el.duration + acc, 0),
		OPTIMAL: (prev, next) =>
			prev.segments.reduce((acc, el) => el.stops.length + acc, 0) -
			next.segments.reduce((acc, el) => el.stops.length + acc, 0),
		CHEAP: (prev, next) => prev.price - next.price,
	}

	filteredList.sort(sortValue[sort])

	const ticketsList = filteredList
		.slice(0, displayTickets)
		.map(ticket => <ResultsItem key={ticket.id} {...ticket} />)

	if (!tickets.length) {
		return (
			<div className={classes.spinnerContainer}>
				<Spin size='large' />
			</div>
		)
	}

	if (!ticketsList.length) {
		return (
			<div className={classes.alertContainer}>
				<Alert
					message='Рейсов, подходящих под заданные фильтры, не найдено'
					type='info'
					showIcon
				/>
			</div>
		)
	}

	const buttonMore = (
		<button
			className={classes.buttonMore}
			onClick={() => setDisplayTickets(tickets => tickets + 5)}
			type='button'
		>
			Показать ещё 5 билетов!
		</button>
	)

	const showButtonMore =
		ticketsList.length < filteredList.length && filteredList.length
			? buttonMore
			: null

	return (
		<>
			<ul className={classes.list}>{ticketsList}</ul>
			{showButtonMore}
		</>
	)
}

ResultsList.propTypes = {
	tickets: PropTypes.array.isRequired,
	filter: PropTypes.objectOf(bool).isRequired,
	sort: PropTypes.string.isRequired,
}

const mapStateToProps = store => ({
	tickets: store.tickets.items,
	filter: store.filter,
	sort: store.sort,
})

export default connect(mapStateToProps)(ResultsList)
