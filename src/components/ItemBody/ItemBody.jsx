import React from 'react'
import PropTypes, { string } from 'prop-types'
import lightFormat from 'date-fns/lightFormat'
import classes from './ItemBody.module.scss'

export default function ItemBody({
	origin,
	destination,
	date,
	stops,
	duration,
}) {
	const timeFlight =
		duration / 60 >= 24
			? `${Math.floor(duration / 1440)}д ${Math.floor(duration / 60) % 24}ч ${
					duration % 60
			  }м`
			: `${Math.floor(duration / 60)}ч ${duration % 60}м`

	const formatDate = new Date(date)
	const timeTakeoff = lightFormat(formatDate, 'HH:mm')
	const timeLanding = lightFormat(
		formatDate.setMinutes(formatDate.getMinutes() + duration),
		'HH:mm'
	)

	let stopsAmount = `${stops.length} пересадок`
	if (stops.length === 1) {
		stopsAmount = `${stops.length} пересадка`
	}
	if (stops.length === 2 || stops.length === 3) {
		stopsAmount = `${stops.length} пересадки`
	}

	return (
		<div className={classes.descriptionRow}>
			<div className={classes.descriptionColumn}>
				<span className={classes.titleInfo}>
					{origin} – {destination}
				</span>
				<span className={classes.info}>
					{timeTakeoff} – {timeLanding}
				</span>
			</div>
			<div className={classes.descriptionColumn}>
				<span className={classes.titleInfo}>В пути</span>
				<span className={classes.info}>{timeFlight}</span>
			</div>
			<div className={classes.descriptionColumn}>
				<span className={classes.titleInfo}>{stopsAmount}</span>
				<span className={classes.info}>{stops.join(', ')}</span>
			</div>
		</div>
	)
}

ItemBody.propTypes = {
	origin: PropTypes.string.isRequired,
	destination: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	stops: PropTypes.arrayOf(string).isRequired,
	duration: PropTypes.number.isRequired,
}
