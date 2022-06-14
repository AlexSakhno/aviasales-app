import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import FilterItem from '../FilterItem/FilterItem'
import classes from './Filter.module.scss'
import { arrFilters } from '../../models/models'

export default function Filter() {
	const filters = arrFilters.map(filter => {
		return <FilterItem key={uuidv4()} name={filter} />
	})
	return (
		<div className={classes.filterContainer}>
			<span className={classes.filterTitle}>Количество пересадок</span>
			<ul className={classes.filterList}>{filters}</ul>
		</div>
	)
}
