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
    return (
      <GoogleMap defaultZoom={1} defaultCenter={{ lat: 29.5, lng: -95 }}>
        {props.markers === !undefined && props.markers.map(marker => {
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
                    {marker.offences}
                  </div>
                </InfoWindow>}
            </Marker>
          )
        })}
      </GoogleMap>
    )
  })
  
  export default class ShelterMap extends Component {
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