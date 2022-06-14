import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './ResultsSort.module.scss';
import { changeSort } from '../../store/actions';

function ResultsSort({ sort, changeSort }) {
  return (
    <div className={classes.container}>
      <button
        className={`${classes.item} ${sort === 'CHEAP' ? classes.active : null}`}
        onClick={() => changeSort('CHEAP')}
        type="button"
      >
        Самый дешёвый
      </button>
      <button
        className={`${classes.item} ${sort === 'FAST' ? classes.active : null}`}
        onClick={() => changeSort('FAST')}
        type="button"
      >
        Самый быстрый
      </button>
      <button
        className={`${classes.item} ${sort === 'OPTIMAL' ? classes.active : null}`}
        onClick={() => changeSort('OPTIMAL')}
        type="button"
      >
        Оптимальный
      </button>
    </div>
  );
}

ResultsSort.propTypes = {
  sort: PropTypes.string.isRequired,
  changeSort: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sort: state.sort,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ changeSort }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResultsSort);
