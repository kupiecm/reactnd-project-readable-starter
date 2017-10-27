import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCategories, fetchPosts } from "../actions";

import Header from '../components/Header';
import CategoryView from '../components/CategoryView';
import PostView from './posts/PostView';
import PostInput from "./posts/PostInput";

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

