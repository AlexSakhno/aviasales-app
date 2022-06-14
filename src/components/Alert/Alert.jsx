import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import classes from './Alert.module.scss';
import icon from './ok.png';

function Alert({ loadComplete }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (loadComplete) {
      setTimeout(() => {
        const alertWindow = document.getElementById('alert');
        alertWindow.style.height = 0;
      }, 3500);
      setTimeout(() => setHidden(true), 4000);
    }
  }, [loadComplete, setHidden]);

  if (hidden) return null;

  if (loadComplete) {
    return (
      <div className={classes.container} id="alert">
        <img className={classes.icon} src={icon} alt="icon" />
        <div className={classes.text}>Все билеты получены!</div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Spin size="large" />
      <div className={classes.text}>Получаем данные о билетах</div>
    </div>
  );
}

Alert.propTypes = {
  loadComplete: PropTypes.bool.isRequired,
};

const mapStateToProps = (store) => ({
  loadComplete: store.tickets.loadComplete,
});

export default connect(mapStateToProps)(Alert);
