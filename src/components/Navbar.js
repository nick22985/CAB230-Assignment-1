import React, { Component } from 'react';
import {removeSessionVar} from '../api/cab230-hackhouse'

export function handleClearCache() {
  removeSessionVar()
  }

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      hreflocation: "./Login",
      LoginOut: "Login"
    }; 
  }

  componentDidMount() {
    if (sessionStorage.token == null) {
      this.setState({LoginOut: "Login", hreflocation: "./Login"})
    }
    else {
      console.log(this.state)
      this.setState({LoginOut: "Logout", hreflocation: ""})
    }
  }
  
  handleSwitchLogin(e) {
    console.log("test")
    if (sessionStorage.token == null) {
      console.log("null")
      this.setState({LoginOut: "Login", hreflocation: "./Login"})
    }
    else {
      console.log(this.state)
      this.setState({LoginOut: "Logout", hreflocation: ""})
      handleClearCache()
    }
  }

  render() {
  return (
    <header className="nav-header">
      <h1 className="logo">CAB230 Assignment Client Side</h1>
      <input type="checkbox" id="nav-toggle" className="nav-toggle"></input>
      <nav>
        <ul>
          <li><a href="./">Home</a></li>
          <li><a href="./Data">Data</a></li>
          <li><a onClick = {this.handleSwitchLogin.bind(this)} href = {this.state.hreflocation} >{this.state.LoginOut}</a></li>
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        <span></span>
      </label>
    </header>
  )
  }
}

export default Navbar

