import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCategories, fetchPosts } from "../actions";

import Header from '../components/Header';
import CategoryView from '../components/CategoryView';
import PostView from './posts/PostView';
import PostInput from "./posts/PostInput";

/*
  Root component routes to the different components depending on the url. Here, I also fetch categories and posts.
  In fetchPosts action, I dispatch RECEIVE_POSTS and LOAD_COMMENTS action. Those two actions are together as upon
  receiving data about each post, I issue API call to fetch all comments that belong to certain post.
 */
class Root extends Component {

  componentWillMount () {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
    dispatch(fetchPosts());
  };

  render () {
    return (
      <Router>
        <div className="App">
          <Header/>
          <Route exact path="/" component={CategoryView}/>
          <Route path="/post/:id" component={PostView}/>
          <Route path="/add" component={PostInput}/>
          <Route path="/edit/:id" component={PostInput}/>
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ posts, categories }) {
  return {
    posts: posts.items,
    categories: categories.items
  }
}

export default connect(mapStateToProps)(Root);

