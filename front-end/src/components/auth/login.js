import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div>
        <div className="login-register-container">
          <div className="login-register-wrapper">
            <input type="text"/>
            <input type="password"/>
            <button className="login">LOGIN</button>
          </div>
        </div>
      </div>
    )
  }
}