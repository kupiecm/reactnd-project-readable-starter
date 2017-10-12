import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';
import { addPost, removePost } from './actions';
import * as API from './utils/api';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText } from 'reactstrap';
import classnames from 'classnames';


class App extends Component {

  state = {
    activeTab: 'all',
    posts: null,
    categories: null
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

  render () {

    const { categories, posts } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <div className="col-xs-12">
            <Nav tabs>
              {categories && categories.map(category => (
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === category.name })}
                    onClick={() => {
                      this.toggle(category.name);
                    }}
                  >
                    {category.name}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              {categories && categories.map(category => (
                <TabPane tabId={category.name}>
                  <div className="row">
                    <div className="col-sm-12">
                      {posts && posts.filter(post =>
                        category.name === 'all' || post.category === category.name).map(post => (
                        <div className="row">
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
