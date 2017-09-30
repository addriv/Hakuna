import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { configureStore } from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  //Bootstrap the user
  let store;
  if (window.currentUser) {
    const preloadedState = { session:
      { currentUser: window.currentUser, teams: null } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  }
  else {
    store = configureStore();
  }

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
