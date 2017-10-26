import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './App.css';
import 'font-awesome/css/font-awesome.min.css';

import Root from './components/Root';
import reducer from './reducers';

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const App = () => (
  <Provider store={store}>
    <Root/>
  </Provider>
);

export default App;
