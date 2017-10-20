import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';

export default function Header () {

  return (
    <section>
      <header className="App-header text-center">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo"/>
        </Link>
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <div className="separator-30"></div>
    </section>
  )
}