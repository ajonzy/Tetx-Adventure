import React, { Component } from 'react';

import Login from './auth/login';
import Register from './auth/register';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className="header">
          <h1>Text Adventure</h1>
        </div>
        <Login />
        <Register />
      </div>
    );
  }
}
