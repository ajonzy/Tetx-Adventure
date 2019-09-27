import React, { Component } from 'react';

import Login from './auth/login';
import Register from './auth/register';
import Home from "./pages/home"

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin = (user) => {
    this.setState({
      loggedIn: true,
      user: user
    })
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      user: {}
    })
  }

  render() {
    return (
      <div className='app'>
        <div className="header">
          <h1>Text Adventure</h1>
        </div>

        
        {this.state.loggedIn 
        ? 
          <div className="logged-in">
            <button onClick={this.handleLogout}>Log Out</button>
            <Home user={this.state.user} /> 
          </div>
        : 
          <div className="auth">
            <Login callback={this.handleLogin}/>
            <Register callback={this.handleLogin}/>
          </div>
        }
      </div>
    );
  }
}
