import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as API from '../utils/api';

import { loadPosts, loadCategories } from '../actions';

import Header from '../components/Header';
import CategoryView from '../components/CategoryView';
import PostView from '../components/PostView';
import AddEditPostView from "../components/AddEditPostView";

class Root extends Component {

  componentDidMount () {

    API
      .getCategories()
      .then(categories => {
        categories = [{ name: 'all', path: 'all' }, ...categories];
        this.props.dispatch(loadCategories(categories));
      });
    API
      .getPosts()
      .then(posts => {
        this.props.dispatch(loadPosts(posts));
        // this.setState(() => ({ fetchingData: false }));
      });
  };

  render () {
    return (
      <Router>
        <div className="App">
          <Header/>
          <Route exact path="/" component={CategoryView}/>
          <Route path="/post/:id" component={PostView}/>
          <Route path="/edit/:id" component={AddEditPostView}/>
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ postsCtrl, categoriesCtrl }) {
  return {
    posts: postsCtrl.posts,
    categories: categoriesCtrl.categories
  }
}

export default connect(mapStateToProps)(Root);

