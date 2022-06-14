import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes, { bool } from 'prop-types';
import classes from './FilterItem.module.scss';
import { changeFilter, changeFilterAll } from '../../store/actions';

function FilterItem({ name, filter, changeFilter, changeFilterAll }) {
  const titleCheckbox = {
    ALL: 'Все',
    '0_TRANS': 'Без пересадок',
    '1_TRANS': '1 пересадка',
    '2_TRANS': '2 пересадки',
    '3_TRANS': '3 пересадки',
  };
  const toggleCheck = () => {
    name === 'ALL' ? changeFilterAll() : changeFilter(name);
  };

  return (
    <li className={classes.container}>
      <label className={classes.filterItem}>
        <div className={classes.contentContainer}>
          <input
            name={name}
            onChange={toggleCheck}
            className={classes.checkInput}
            type="checkbox"
            checked={filter[name]}
          />
          <span className={classes.checkBox} />
          {titleCheckbox[name]}
        </div>
      </label>
    </li>
  );
}

FilterItem.propTypes = {
  name: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
  changeFilterAll: PropTypes.func.isRequired,
  filter: PropTypes.objectOf(bool).isRequired,
};

const mapStateToProps = (state) => ({
  filter: state.filter,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ changeFilterAll, changeFilter }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilterItem);
