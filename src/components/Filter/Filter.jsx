import React from 'react'
import FilterItem from '../FilterItem/FilterItem'
import classes from './Filter.module.scss'

export default function Filter() {
	return (
		<div className={classes.filterContainer}>
			<span className={classes.filterTitle}>Количество пересадок</span>
			<ul className={classes.filterList}>
				<FilterItem name='ALL' />
				<FilterItem name='0_TRANS' />
				<FilterItem name='1_TRANS' />
				<FilterItem name='2_TRANS' />
				<FilterItem name='3_TRANS' />
			</ul>
		</div>
	)
}
