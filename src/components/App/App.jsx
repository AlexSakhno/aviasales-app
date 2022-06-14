import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { getSearchID, getTickets } from '../../store/actions';
import Filter from '../Filter/Filter';
import Alert from '../Alert/Alert';
import ResultsSort from '../ResultsSort/ResultsSort';
import ResultsList from '../ResultsList/ResultsList';
import LogoImage from '../../img/Logo.svg';
import classes from './App.module.scss';

function App({ searchID, isLoading, loadComplete, getSearchID, getTickets }) {
  useEffect(getSearchID, [getSearchID]);

  if (searchID && !isLoading && !loadComplete) {
    getTickets(searchID);
  }

  return (
    <div className={classes.container}>
      <Alert />
      <div className={classes.logoContainer}>
        <img src={LogoImage} alt="logo" className={classes.logo} />
      </div>
      <Row gutter={{ xs: 0, md: 24 }}>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <Filter />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 16 }}>
          <ResultsSort />
          <ResultsList />
        </Col>
      </Row>
    </div>
  );
}

App.propTypes = {
  searchID: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadComplete: PropTypes.bool.isRequired,
  getSearchID: PropTypes.func.isRequired,
  getTickets: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  searchID: store.searchID,
  isLoading: store.tickets.isLoading,
  loadComplete: store.tickets.loadComplete,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ getSearchID, getTickets }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
