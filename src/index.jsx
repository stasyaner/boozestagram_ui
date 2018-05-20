import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainContainer from './containers/MainContainer';
import configureStore from './store';

render(
  <Provider store={configureStore()}>
    <Router>
      <Route path="/" component={MainContainer} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
