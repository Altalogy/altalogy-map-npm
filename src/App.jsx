import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer } from 'react-leaflet'
import MapMarker from './components/MapMarker'
import './App.scss'

const DEFAULT_VIEWPORT = {
  center: [50.270908, 19.039993],
  zoom: 13,
}


export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewport: DEFAULT_VIEWPORT,
      markers: [],
    }
  }

  setViewport(lat,lng,zoom) {
    if(lat && lng && zoom){
      this.setState({
        viewport: {
          center: [lat,lng],
          zoom:[zoom]
        }
      })
    }
  }

  addMarkers(lat,lng,text) {
    if(lat && lng) {
      const marker = {
        position: [lat,lng],
        text: text
      }
      this.setState({
        markers: [
          ...this.state.markers,
          marker
        ]
      })
    }
  }

  render() {
    const { viewport, markers } = this.state
    return (
      <div className="App">
        <Map viewport={viewport} style={{ width:'100vw', height: '100vh' }}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapMarker
            markers={markers}
          />
        </Map>
      </div>
    )
  }
}

export default App;
