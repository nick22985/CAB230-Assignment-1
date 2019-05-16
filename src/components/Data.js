import React, { Component } from 'react';
import {Offences, Search} from '../api/cab230-hackhouse'
import Mapscomponent from './Mapscomponent'
import ShelterMap from './sheltereg'


class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offences: [], 
      isMapOpen: false
    }
  }
  
  showMapBox () {
    this.setState({isMapOpen: true})
  }

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
  }

  handleBtnOff = async (e) => {
    let test = null
    let result = await Offences()
    console.log(result)
    result.offences.forEach(element => {
      test = test + element + ", "
    });
    var temp = test.replace("null", "");
    let appDiv = document.getElementById("returnOff");
    appDiv.innerHTML = temp;
  }

  handleSubmitSer = async (e) => {
    e.preventDefault();
    var input = 'offence='+this.state.OffenceSer
    let result = await Search(input)
    console.log(this.state)
    console.log(result)
    
    // result.result.forEach(element => {
    //   var c = element
    //   console.log(c)
    //   if (c === undefined) {
    //     c.id = iterator;
    //     iterator++;
    //     console.log('---------------------')
    //     console.log(element)
    //   }      
    // });

    // for (var i in result) {
    //   var c = result[i]

    //   if (typeof c === 'object') {
    //     if (c.length === undefined) {
    //       c.id = iterator;
    //       iterator++;
    //     }
    //   }
    // }



    this.setState({offences: result})
    //get inside data
    let temp = result.result[1]
    console.log(temp.LGA)
    console.log(temp.total)
    console.log(temp.lat)
    console.log(temp.lng)
  }

  setDataSource(e) {
    console.log(e.target.value);
    if(e.target.value === "TABLE") {
      this.setState({isMapOpen: false})
    }
    if (e.target.value === "MAP") {
      this.setState({isMapOpen: true})
    }

  }
      
  render() {
    return (
      <div>
        <div className="container">
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
            </div>
            <div id="map-container">
            <div onChange={this.setDataSource.bind(this)}>
              <input type="radio" value="TABLE" name="gender"/> Table
              <input type="radio" value="MAP" name="gender"/> Map
            </div>
            </div>
            <div id='map-container'>
              {this.state.isMapOpen && <Mapscomponent offencelistfromparent = {this.state.offences}/>}
            </div>
            {/* <ShelterMap /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Data