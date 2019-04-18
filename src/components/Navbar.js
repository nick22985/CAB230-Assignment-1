import React from 'react';

const Navbar = () => {
  
  return (
    <header className="nav-header">
      <h1 className="logo">Assignment</h1>
      <input type="checkbox" id="nav-toggle" className="nav-toggle"></input>
      <nav>
        <ul>
          <li><a href="./">Home</a></li>
          <li><a href="./Data">Data</a></li>
          <li><a href="./Login">Login</a></li>
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        <span></span>
      </label>
    </header>
  )
}

export default Navbar

