import React, { Component } from 'react';

export default class Register extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      userName: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div className="login-register-container">
          <div className="login-register-wrapper">
            <input className="userName" type="text" name="userName" onChange={this.handleChange}/>
            <input className="password" type="password" name="password" onChange={this.handleChange}/>
            <button className="register">REGISTER</button>
          </div>
        </div>
      </div>
    )
  }
}