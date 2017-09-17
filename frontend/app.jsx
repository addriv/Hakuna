import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';

//TEST ONLY REMEMBER TO DELETE
import { configureStore } from './store/store';
//TEST ONLY REMEMBER TO DELETE


document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();

  //TEST ONLY REMEMBER TO DELETE
  window.store = store;
  //TEST ONLY REMEMBER TO DELETE

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
