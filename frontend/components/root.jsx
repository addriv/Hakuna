import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import SignupContainer from './signup_container';

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Route path='/signup' component={SignupContainer}/>
    </HashRouter>
  </Provider>
);
