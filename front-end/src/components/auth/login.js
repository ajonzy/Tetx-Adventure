import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      userName: '',
      password: ''
    }
  }
  render() {
    return (
      <div>
        <div className="login-register-container">
          <div className="login-register-wrapper">
            <input className="userName" type="text"/>
            <input className="password" type="password"/>
            <button className="login">LOGIN</button>
          </div>
        </div>
      </div>
    )
  }
}