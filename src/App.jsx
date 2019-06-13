import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import MapMarker from './components/MapMarker'
import MapDraw from './components/MapDraw'
import CustomMapDraw from './components/CustomMapDraw'
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
      draw: {
        active: false,
        position: 'topright',
        options: {}
      }
    }
  }

  componentDidMount() {
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

  setDraw(pos,option) {
    let position = null
    let options = null
    if(pos === 'topleft' || pos === 'topright' ||
    pos === 'bottomleft' || pos === 'bottomright') {
      position = pos
    }
    if(option === 'polyline' || option === 'polygon' ||
    option === 'rectangle' || option === 'circle' ||
    option === 'marker' || option === 'circlemarker') {
      options = { [option] : false }
    } else if (option) {
      options = option
    }
    this.setState({
      draw: {
        active: pos || option ? true : false,
        position: position ? position : 'topright',
        options: option ? options : {}
      }
    })
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
    const { viewport, markers, draw } = this.state
    return (
      <div className="App">
        <Map ref='map' viewport={viewport} style={{ width:'100vw', height: '100vh' }}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapMarker
            markers={markers}
          />
          <MapDraw
            draw={draw}
          />
        </Map>
      </div>
    )
  }
}

export default App;
