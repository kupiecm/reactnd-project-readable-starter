import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

import { filterPosts, changeOrder, addPost, removePost, selectPost } from './actions';
import * as API from './utils/api';

import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText } from 'reactstrap';
import { ControlButtons } from './components/ControlButtons';
import { Post } from './components/Post';

class App extends Component {

  state = {
    activeTab: 'all',
    posts: null,
    categories: null,
  };

  toggle (tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount = () => {
    API.getPosts().then((posts) => {
      this.setState({ posts });
    });

    API.getCategories().then((categories) => {
      categories = [{ name: 'all', path: 'all' }, ...categories];
      this.setState({ categories });
    });
  };

  compareFcn = (field, reverse) => {
    return function (a, b) {
      return reverse ? a[field] - b[field] : b[field] - a[field];
    };
  };

  render () {

    const { categories, posts, activeTab } = this.state;
    const { compareField, reverseOrder, filter, changeOrder, selectPost } = this.props;

    return (
      <div className="App">
        <header className="App-header text-center">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo"/>
          </Link>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="separator-30"></div>

        <Route exact path="/" render={() => (
          <div className="container">
            <ControlButtons
              reverseOrder={reverseOrder}
              onSelect={filter}
              changeOrder={changeOrder}
            />
            <div className="separator-30"></div>
            <div>
              <Nav tabs>
                {categories && categories.map(category => (
                  <NavItem key={category.name}>
                    <NavLink
                      className={classnames({ active: activeTab === category.name })}
                      onClick={() => {
                        this.toggle(category.name);
                      }}
                    >
                      {category.name}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
              <TabContent activeTab={activeTab}>
                {categories && categories.map(category => (
                  <TabPane key={category.name} tabId={category.name}>
                    <div className="row">
                      <div className="col-sm-12">
                        {posts &&
                        posts
                          .filter(post => category.name === 'all' || post.category === category.name)
                          .sort(this.compareFcn(compareField, reverseOrder))
                          .map(post => (
                            <div key={post.id} className="row">
                              <div className="separator-30"></div>
                              <Card body className="text-center">
                                <CardTitle>{trim(post.title)}</CardTitle>
                                <CardText>{trim(post.body)}</CardText>
                                <div>
                                  <Link
                                    to={`/post/${post.id}`}
                                    onClick={(e) => {
                                      selectPost(post);
                                    }}>
                                    <Button color="info" className="col-4">More</Button>
                                  </Link>
                                </div>
                              </Card>
                            </div>
                          ))}
                      </div>
                    </div>
                  </TabPane>
                ))}
              </TabContent>
            </div>
          </div>
        )}/>

        <Route path="/post/:id" component={Post}/>

      </div>
    );
  }
}

function trim (str) {
  return str.length > 120
    ? str.slice(0, 120) + '...'
    : str;
}

function mapStateToProps ({ filter, posts }) {

  const { compareField, reverseOrder } = filter;
  return {
    compareField: compareField,
    reverseOrder: reverseOrder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    filter: (data) => dispatch(filterPosts(data)),
    changeOrder: (data) => dispatch(changeOrder(data)),
    selectPost: (data) => dispatch(selectPost(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
