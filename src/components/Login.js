import React, { Component } from 'react';

let JWT = null;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoginOpen: true, isRegisterOpen: false, isRegisterSucess: false}; 
  }
  showLoginBox() {
    this.setState({isLoginOpen: true, isRegisterOpen: false, isRegisterSucess: false})
  }
  showRegisterBox() {
    this.setState({isLoginOpen: false, isRegisterOpen: true, isRegisterSucess: false})
  }
  showRegisterSucessBox() {
    this.setState({isLoginOpen: false, isRegisterOpen: false, isRegisterSucess: true})
  }
  render() {
    return (
      <div className="root-container">
          <div className="box-controller">
              <div className={"controller " + (this.state.isLoginOpen ? "selected-controller" : "")} onClick={this.showLoginBox.bind(this)}>
                Login
              </div>
              <div className={"controller " + (this.state.isRegisterOpen ? "selected-controller" : "")}  onClick={this.showRegisterBox.bind(this)}>
              Register
              </div>
          </div>
          <div className="box-container">
            {this.state.isLoginOpen &&  <LoginBox />}
            {this.state.isRegisterOpen &&  <RegisterBox />}
            {this.state.isRegisterSucess && <RegisterSucessBox/>}
          </div>
      </div>         
    )
  }
}

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {email: "", password: "", errors: [], pwdState: null};
  }

  showVallidationErr(elm, msg) {
    this.setState((prevState) => ({ errors: [...prevState.errors, {elm, msg}]}))
  }
  clearVallidationErr(elm){
    this.setState((prevState) => {
      let newArr = [];
      for(let err of prevState.errors) {
        if(elm !== err.elm) {
          newArr.push(err);
        }
      }
      return {errors: newArr};
    })
  }
  onEmailChange(e) {
    this.setState( {email: e.target.value})
    this.clearVallidationErr("email");
  }
  onPasswordChange(e) {
    this.setState( {password: e.target.value})
    this.clearVallidationErr("password");
  }
  sumbitLogin(e) {
    e.preventDefault();
    if(this.state.email === "") {
      this.showVallidationErr("email", "Email Cannot be Empty!")

    } if (this.state.password === "") {
      this.showVallidationErr("password", "Password Cannot be Empty!")
    } 
    var str = 'email='+this.state.email+'&password='+this.state.password;
    var isemailvalid = str.match("@");
    if (isemailvalid == null) {
      this.showVallidationErr("email", "Please Enter a Valid Eamil!")
      return
    }
    var result = str.replace("@", "%");
    fetch("http://hackhouse.sh:3000/login", {
    method: "POST",
    body: result,
    headers: {
        "Content-type": "application/x-www-form-urlencoded"
    }
})
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    })
    .then(function(result) {
        // let appDiv = document.getElementById("returnLog");
        // appDiv.innerHTML = JSON.stringify(result);
        JWT = result.token;
        console.log(JWT);
    })
    .catch(function(error) {
        console.log("There has been a problem with your fetch operation: ",error.message);
    });
  }
  render() {

    let emailErr = null, passwordErr = null;
    
    for(let err of this.state.errors) {
      if(err.elm === "email") {
        emailErr = err.msg;
      } if(err.elm === "password") {
        passwordErr = err.msg;
      }
    }
    
    return (
      <div className="inner-container">
        <div className="header">
          Login  
        </div>
        <div className="box">
          <div className="input-group">
            <label className="login-label" htmlFor="email">Email</label>
            <input type="text" name="email" className="login-input" placeholder="Email" onChange={this.onEmailChange.bind(this)}/>
            <small className="danger-error">{ emailErr ? emailErr : ''}</small>
          </div>
          <div className="input-group">
            <label className="login-label" htmlFor="password">Password</label>
            <input type="password" name="password" className="login-input" placeholder="Password" onChange={this.onPasswordChange.bind(this)}/>
            <small className="danger-error">{ passwordErr ? passwordErr : ''}</small>
        <button type="button" className="login-btn" onClick={this.sumbitLogin.bind(this)}>Login</button>
       
          </div>
        </div>
      </div>
    )
  }
}

class RegisterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {email: "", password: "", errors: [], pwdState: null};
  }

  showVallidationErr(elm, msg) {
    this.setState((prevState) => ({ errors: [...prevState.errors, {elm, msg}]}))
  }
  clearVallidationErr(elm){
    this.setState((prevState) => {
      let newArr = [];
      for(let err of prevState.errors) {
        if(elm !== err.elm) {
          newArr.push(err);
        }
      }
      return {errors: newArr};
    })
  }

  onEmailChange(e) {
    this.setState( {email: e.target.value})
    this.clearVallidationErr("email");
  }

  onPasswordChange(e) {
    this.setState( {password: e.target.value})
    this.clearVallidationErr("password");

    this.setState({pwdState: "weak"})
    if(e.target.value.length > 5) {
      this.setState({pwdState: "medium"})
    } if (e.target.value.length > 10){
      this.setState({pwdState: "strong"})
    }
  }

  sumbitRegister(e) {
    e.preventDefault();
    if(this.state.email === "") {
      this.showVallidationErr("email", "Email Cannot be Empty!")

    } if (this.state.password === "") {
      this.showVallidationErr("password", "Password Cannot be Empty!")
    }
    else {
      var str = 'email='+this.state.email+'&password='+this.state.password;
      var isemailvalid = str.match("@");
      if (isemailvalid == null) {
        this.showVallidationErr("email", "Please Enter a Valid Eamil!")      
        console.log(str)  
        return
      }
      var result = str.replace("@", "%");
      fetch("http://hackhouse.sh:3000/register", {
        method: "POST",
        body: result,
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
      }
    })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then(function(result) {
        if (result != null) {
          console.log(result)
        }
        // let appDiv = document.getElementById("test");
        // appDiv.innerHTML = JSON.stringify(result);
        // regButton.disabled = true;
      })
      .catch(function(error) {
        console.log("There has been a problem with your fetch operation: ",error.message);
      });
      this.setState ({
        content: ''
      })
    }
  }

  render() {

    let emailErr = null, passwordErr = null;
    
    for(let err of this.state.errors) {
      if(err.elm === "email") {
        emailErr = err.msg;
      } if(err.elm === "password") {
        passwordErr = err.msg;
      }
    }

    let pwdWeak = false, pwdMedium = false, pwdStrong = false;

    if (this.state.pwdState === "weak") {
      pwdWeak = true;
    } else if (this.state.pwdState === "medium") {
      pwdWeak = false;
      pwdMedium = true;
    } else if (this.state.pwdState === "strong") {
      pwdWeak = false;
      pwdMedium = false;
      pwdStrong = true;
    }
    
    return (
      <div className="inner-container">
        <div className="header">
          Register  
        </div>
        <div className="box">
          <div className="input-group">
            <label className="login-label" htmlFor="email">Email</label>
            <input type="text" name="email" className="login-input" placeholder="Email" onChange={this.onEmailChange.bind(this)}/>
            <small className="danger-error">{ emailErr ? emailErr : ''}</small>
          </div>
          <div className="input-group">
            <label className="login-label" htmlFor="password">Password</label>
            <input type="password" name="password" className="login-input" placeholder="Password" onChange={this.onPasswordChange.bind(this)}/>
            <small className="danger-error">{ passwordErr ? passwordErr : ''}</small>
            {this.state.password && <div className="password-state">
            <div className={"pwd pwd-weak " + (pwdWeak ? "show" : "")}></div>
            <div className={"pwd pwd-medium " + (pwdMedium ? "show" : "")}></div>
            <div className={"pwd pwd-strong " + (pwdStrong ? "show" : "")}></div>
            </div>}
        <button type="button" className="login-btn" onClick={this.sumbitRegister.bind(this)}>Register</button>
       
          </div>
        </div>
      </div>
    )
  }
}

class RegisterSucessBox extends Component {

  render() {
    return (
      <div className="inner-container">
        <div className="header">
          Registration Complete
        </div>
        <div className="box">
          <p>Do Stuff here</p>
          <button className="login-btn"> Login Now </button>
          <button className="login-btn">Home</button>
        </div>
      </div>
    )
  }
}


export default Login
