import React, { Component } from 'react';

export default class Register extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      username: '',
      password: '',
      usernameTaken: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      usernameTaken: false
    })
  }

  handleSubmit(event) {
    fetch("http://127.0.0.1:5000/users/add", {
      method: "POST",
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(response => {
        if (response === 'Added user') {
          console.log('You Created A User')
          fetch(`http://127.0.0.1:5000/users/get/${this.state.username}`, {
            method: "GET",
            headers: {
              "Content-type": "application/json"
            }
          })
          .then(response => response.json())
          .then(data => {
            this.props.callback(data)
          })
        } else if (response === "User already exists") {
          console.log("Taken!!!")
          this.setState({
            usernameTaken: true
          })
        } else {
          console.log('You FAILED To Create A User')
        }
    })
    .catch(error => {
      console.log(error)
    });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="login-register-container">
          <div className="login-register-wrapper">
            <input className="username" type="text" name="username" onChange={this.handleChange} placeholder="Username"/>
            <input className="password" type="password" name="password" onChange={this.handleChange} placeholder="Password"/>
            <button className="register" onClick={this.handleSubmit}>REGISTER</button>
            {this.state.usernameTaken ? <div>Username Taken!</div> : null}
          </div>
        </div>
      </div>
    )
  }
}