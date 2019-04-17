import React, { Component } from 'react';
import Navbar from './components/Navbar'
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Data from './components/Data'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={Home}/>`
          <Route path='/Login' component={Login} />
          <Route path='/Data' component={Data} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
