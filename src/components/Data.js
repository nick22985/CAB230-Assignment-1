import React, { Component } from 'react';
import {Offences, Search, Areas, Ages, Genders, Years} from '../api/cab230-hackhouse'
import Mapscomponent from '../api/google-maps'
import Table from '../api/Table'
import OffenceSelection from '../components/Offences'

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OffenceSer: [],
      searchResult: [],
      offence: [],
      area: [],
      ages: [],
      gender: [],
      year: [],
      isMapOpen: false,
      LoadRadio: false,
      isTableOpen: false,
      OffenceNotNULL: false,
      Loaded: false,
      isNotLoggedIN: false
      
    }
  }
  // switch boxes
  showMapBox () {
    this.setState({isMapOpen: true, isTableOpen: false})
  }

  showTableBox() {
    this.setState({isMapOpen: false, isTableOpen: true})
  }
// selects state and location and data
  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
  }
//when offence button is clicked
  handleBtnOff = async (e) => {
    e.preventDefault()
    let offence = await Offences()
    let area = await Areas()
    let age = await Ages()
    let gender = await Genders()
    let year = await Years()

    if (year != null) {
      this.setState({offence: offence, area: area, age: age, gender: gender, year: year, Loaded: true})
    }
    if (sessionStorage.token) {
      this.setState({isNotLoggedIN: true})
    }
  }
// handles when sbumit search is pressed
  handleSubmitSer = async (e) => {
    console.log(this.state.OffenceSer)
    let result = await Search(this.state.OffenceSer)
    
    this.setState({searchResult: result})
    console.log(this.state.searchResult)
  }

  handleSearchFilter = (finalSearchString) => {
    this.setState({searchResult: finalSearchString})
    this.setState({LoadRadio: true})
  }

  setDataSource= async (e) => {
    if (this.state.searchResult !== "") {
      if(e.target.value === "TABLE") {
        this.setState({isMapOpen: false, isTableOpen: true})
      }
      if (e.target.value === "MAP") {
        this.setState({isMapOpen: true, isTableOpen: false})
      }      
    }
    
  }

  render() {
    return (
      <div>
        <div className="container">
          <div id="Offence">
              <h4>Get Offence's</h4>
              {<button id='offBtn' onClick={this.handleBtnOff}>Get Offence</button>}
              <div>
                {this.state.Loaded && this.state.isNotLoggedIN && <OffenceSelection onSubmitSeachF={this.handleSearchFilter} propfromparent = {this.state} />}
                {this.state.Loaded && !this.state.isNotLoggedIN && <p>Currently not logged in please log in and try again</p>}
              </div>
              <p id='returnOff'></p>
          </div>
          <div id="Search">
          
            <div id="test">
            
            </div>
            <div id="map-container">
              {this.state.LoadRadio && <div onChange={this.setDataSource.bind(this)}>
              <input type="radio" value="TABLE" name="gender"/> Table
              <input type="radio" value="MAP" name="gender"/> Map
              </div>
            }
            
            </div>
            <div id='map-container'>
              {this.state.isMapOpen && <Mapscomponent offencelistfromparent = {this.state.searchResult}/>}
              {this.state.isTableOpen && <Table offencelistfromparent = {this.state.searchResult}/>}
            </div>
            {/* <ShelterMap /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Data