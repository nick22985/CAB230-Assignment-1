import React, { Component } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
  console.log(props.markers)
  console.log(props)
  
    return (
      <GoogleMap defaultZoom={5} defaultCenter={{ lat: -20, lng: 150 }}>
        {props.markers.map(marker => {
          if (marker.total !== 0) {
          const onClick = props.onClick.bind(this, marker)
          return (
            <Marker
              key={marker.id}
              onClick={onClick}
              position={{ lat: marker.lat, lng: marker.lng }}
            >
              {props.selectedMarker === marker &&
                <InfoWindow>
                  <div>
                    <h4>{props.selectedMarker.LGA}</h4>
                    <p>Total = {props.selectedMarker.total}</p>
                    <p>lat = {props.selectedMarker.lat}</p>
                    <p>long = {props.selectedMarker.lng}</p>
                  </div>
                </InfoWindow>}
            </Marker>
          )
        }})}
      </GoogleMap>
    )
  })
  
  export default class Mapscomponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        shelter: [],
        offences: [],
        selectedMarker: false
      }
    }


    handleClick = (marker, event) => {
      console.log({ marker })
      this.setState({ selectedMarker: marker })
    }
    
    render() {
      return (
        <div>
        <MapWithAMarker
          selectedMarker={this.state.selectedMarker}
          markers={this.props.offencelistfromparent.result}
          onClick={this.handleClick}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAPEhM9FWOrdwn31_xYGMB9cSjrI2jiQk8&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '500px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
        </div>
      )
    }
  }