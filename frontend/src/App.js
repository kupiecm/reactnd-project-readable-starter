import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import 'font-awesome/css/font-awesome.min.css';

import Header from './components/Header';
import CategoryView from './components/CategoryView';
import PostView from './components/PostView';

class App extends Component {

  render () {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={CategoryView}/>
        <Route path="/post/:id" component={PostView}/>
      </div>
    );
  }
}

export default App;
