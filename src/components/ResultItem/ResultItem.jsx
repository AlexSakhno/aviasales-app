import React from 'react';
import PropTypes from 'prop-types';
import classes from './ResultItem.module.scss';
import ItemBody from '../ItemBody/ItemBody';

export default function ResultsItem({ price, carrier, segments }) {
  const carrierLogoURL = `https://pics.avs.io/99/36/${carrier}.png`;

  return (
    <li className={classes.container} tabIndex="0">
      <header className={classes.header}>
        <span className={classes.price}>{price} P</span>
        <img src={carrierLogoURL} alt="aircraft logo" />
      </header>
      <ItemBody {...segments[0]} />
      <ItemBody {...segments[1]} />
    </li>
  );
}

ResultsItem.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.array.isRequired,
};
