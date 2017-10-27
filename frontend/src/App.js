import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import 'font-awesome/css/font-awesome.min.css';

import Root from './components/Root';

import store from './store';

/*
  Store keeps track of posts, comments and categories. All that data is fetched at the beginning to list all
  categories together with posts and number of comments that each post has.
  Posts and categories are kept in state as arrays, while comments are kept as anobject with ids of each post as fields
  and each field (post id) corresponds to an array of comments.
 */

const App = () => (
  <Provider store={store}>
    <Root/>
  </Provider>
);

export default App;