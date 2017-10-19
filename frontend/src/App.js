import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

import { addPost, removePost } from './actions';
import * as API from './utils/api';

import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText } from 'reactstrap';
import { SortButton } from './components/sortBtn';

class App extends Component {

  state = {
    activeTab: 'all',
    compareField: 'voteScore',
    reverseOrder: false,
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
    return function(a, b) {
      return reverse ? a[field] - b[field] : b[field] - a[field];
    };
  };

  render () {

    const { categories, posts, activeTab, compareField, reverseOrder } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="separator-30"></div>
        <div className="container">
          <div className="col-xs-12">
            <SortButton/>
          </div>
          <div className="col-xs-12">
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
                            <Card body>
                              <CardTitle>{post.title}</CardTitle>
                              <CardText>{post.body}</CardText>
                              <Button>{post.author}</Button>
                            </Card>
                          </div>
                        ))}
                    </div>
                  </div>
                </TabPane>
              ))}

              {/*<TabPane tabId="2">*/}
              {/*<div className="row">*/}
              {/*<div className="col-sm-6">*/}
              {/*<Card body>*/}
              {/*<CardTitle>Special Title Treatment</CardTitle>*/}
              {/*<CardText>With supporting text below as a natural lead-in to additional content.</CardText>*/}
              {/*<Button>Go somewhere</Button>*/}
              {/*</Card>*/}
              {/*</div>*/}
              {/*<div className="col-sm-12">*/}
              {/*<Card body>*/}
              {/*<CardTitle>Special Title Treatment</CardTitle>*/}
              {/*<CardText>With supporting text below as a natural lead-in to additional content.</CardText>*/}
              {/*<Button>Go somewhere</Button>*/}
              {/*</Card>*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*</TabPane>*/}
            </TabContent>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(App)
