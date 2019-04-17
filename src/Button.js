import React, { Component } from 'react';


let JWT = null;

class Button extends Component {
  handleChange = (e) => {
      this.setState({
          [e.target.id]: e.target.value
      })
  }
  handleSubmitReg = (e) => {
    e.preventDefault();
    console.log(this.state)
    var input = this.state
    if (input == null || input == null) {
      let Div = document.getElementById("returnReg");
      Div.innerHTML = JSON.stringify("Email or Password Feilds are null");
      return
    }
    else {
      var str = 'email='+this.state.Email+'&password='+this.state.Password;
      var isemailvalid = str.match("@");
      if (isemailvalid == null) {
        let Div = document.getElementById("returnReg");
        Div.innerHTML = JSON.stringify("Please enter a valid email");
        return
      }
      var result = str.replace("@", "%");
      console.log(result)
      fetch("https://cab230.hackhouse.sh/register", {
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
        let appDiv = document.getElementById("returnReg");
        appDiv.innerHTML = JSON.stringify(result);
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
  handleSubmitLog = (e) => {
    e.preventDefault();
    console.log(this.state)
    var input = this.state
    if (input == null || input == null) {
      let Div = document.getElementById("returnLog");
      Div.innerHTML = JSON.stringify("Email or Password Feilds are null");
      return console.log("Email or Password Feilds are null")
    }
    else {
      var str = 'email='+this.state.EmailLog+'&password='+this.state.PasswordLog;
      var isemailvalid = str.match("@");
      if (isemailvalid == null) {
        let Div = document.getElementById("returnLog");
        Div.innerHTML = JSON.stringify("Please enter a valid email");
        return (
          console.log("Please enter a valid email")    
        )
      }
      var result = str.replace("@", "%");
      console.log(result)
    }
    fetch("https://cab230.hackhouse.sh/login", {
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
        let appDiv = document.getElementById("returnLog");
        appDiv.innerHTML = JSON.stringify(result);
        JWT = result.token;
    })
    .catch(function(error) {
        console.log("There has been a problem with your fetch operation: ",error.message);
    });
  }
  handleBtnOff = (e) => {
    e.preventDefault();
    fetch("https://cab230.hackhouse.sh/offences")
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(result) {
            let appDiv = document.getElementById("returnOff");
            appDiv.innerHTML = JSON.stringify(result);
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: ",error.message);
        });
  }
  handleSubmitSer = (e) => {
    e.preventDefault();
    console.log(this.state)
    var input = 'offence='+this.state.OffenceSer
    console.log(input)
    
    //The parameters of the call
    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${JWT}` };
    getParam.headers = head;

    //The URL
    const baseUrl = "https://cab230.hackhouse.sh/search?";
    // const query = 'offence=Weapons Act Offences - Other';
    const query = input;
    const url = baseUrl + query;

    fetch(encodeURI(url),getParam)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(result) {
            let appDiv = document.getElementById("returnSer");
            appDiv.innerHTML = JSON.stringify(result);
        })
        .catch(function(error) {
                console.log("There has been a problem with your fetch operation: ",error.message);
            });
  }
    render() {
        return (
          <div id="Buttons">
            <div id='Register'>
              <div id="SubmitFormReg">
              <h4>Register</h4>
                <form onSubmit={this.handleSubmitReg}>
                    <label htmlFor="Email">Email:</label>
                    <input  type="email" id="Email" onChange={this.handleChange} required/>
                    <label htmlFor="Password">Password:</label>
                    <input type="password" id="Password" onChange={this.handleChange} required/>
                    <button>Submit</button>
                </form>
                <p id='returnReg'></p>
            </div>
          </div>
          <div id="Login">
            <div id="SubmitFormLog">
            <h4>Login</h4>
            <form onSubmit={this.handleSubmitLog}>
                <label htmlFor="EmailLog">Email:</label>
                <input type="text" id="EmailLog" onChange={this.handleChange} />
                <label htmlFor="PasswordLog">Password:</label>
                <input type="password" id="PasswordLog" onChange={this.handleChange} />
                <button>Submit</button>
            </form>
            <p id='returnLog'></p>
            </div>
          </div>
          <div id="Offence">
            <h4>Get Offence's</h4>
            <button id='offBtn' onClick={this.handleBtnOff}>Get Offence</button>
            <p id='returnOff'></p>
          </div>
          <div id="Search">
            <div id="SubmitFormSer">
            <h4>Search</h4>
            <form onSubmit={this.handleSubmitSer}>
                <label htmlFor="OffenceSer">Offence:</label>
                <input type="text" id="OffenceSer" onChange={this.handleChange} />
                <button>Submit</button>
            </form>
            <p id='returnSer'></p>
            </div>
          </div>
        </div>
      )}}

export default Button