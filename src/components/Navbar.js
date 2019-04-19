import React, { Component } from 'react';
import {removeSessionVar} from '../api/cab230-hackhouse'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isLogin: false}; 
  }

handleClearCache(e) {
    e.preventDefault();
    removeSessionVar()
  }
  render() {
  return (
    <header className="nav-header">
      <h1 className="logo">Assignment</h1>
      <input type="checkbox" id="nav-toggle" className="nav-toggle"></input>
      <nav>
        <ul>
          <li><a href="./">Home</a></li>
          <li><a href="./Data">Data</a></li>
          <li><a href="./Login">Login</a></li>
          <li><a onClick={this.handleClearCache.bind(this)} href="./Login">Log Out</a></li>
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

