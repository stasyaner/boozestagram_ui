import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainContainer from './MainContainer';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={MainContainer} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Root;
