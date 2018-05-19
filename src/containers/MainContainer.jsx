import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

class MainContainer extends Component {
  // constructor(...restProps) {
  //   super(...restProps);
  // }

  render() {
    return (
      <div className="main-container">
        <h3>hello world</h3>
      </div>
    );
  }
}

export default hot(module)(MainContainer);
