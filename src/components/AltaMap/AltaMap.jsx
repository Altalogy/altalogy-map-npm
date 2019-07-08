import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import uuid from 'uuidv4'
import MapElement from './models/MapElement'
import MapElements from './components/MapElements'
import MapLeafletDrawer from './components/MapLeafletDrawer'
import MapDrawer from './components/MapDrawer'
import './AltaMap.scss'

const DEFAULT_VIEWPORT = {
  center: [50.270908, 19.039993],
  zoom: 13,
}

class AltaMap extends Component {
  constructor(props) {
    super(props)

    this.drawRef = React.createRef()
    this.leafletDrawer = React.createRef()

    this.state = {
      elements: [],
      viewport: DEFAULT_VIEWPORT,
    }

    this.addElements = this.addElements.bind(this)
    this.setViewport = this.setViewport.bind(this)
    this.addMarker = this.addMarker.bind(this)
    this.getElements = this.getElements.bind(this)
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

  addElements(elements) {
    let mapElement
    let elementsArray = this.state.elements
    elements.map((me) => {
      mapElement = new MapElement(me)
      elementsArray = elementsArray.concat(mapElement)
      return elementsArray
    })
    this.setState({
      elements: elementsArray
    }, () => {
      if(this.props.updateAltaMapState){
        this.props.updateAltaMapState()
      }
    })
  }

  deleteElement(tag) {
    let deleteItem
    let elementsArray = this.state.elements
    if(elementsArray.length > 0) {
      elementsArray.map((elements) => {
        if(elements.tags && elements.tags.indexOf(tag) > -1) {
          deleteItem = elementsArray.indexOf(elements)
          elementsArray.splice(deleteItem,1)
        }
        return elementsArray
      })
    }
    this.setState({
      elements: elementsArray
    }, () => {
      if(this.props.updateAltaMapState){
        this.props.updateAltaMapState()
      }
    })
  }

  deleteElementById(id) {
    let deleteItem
    let elementsArray = this.state.elements
    if(elementsArray.length > 0) {
      elementsArray.map((elements) => {
        if(elements.id === id) {
          deleteItem = elementsArray.indexOf(elements)
          elementsArray.splice(deleteItem,1)
        }
        return elementsArray
      })
    }
    this.setState({
      elements: elementsArray
    }, () => {
      if(this.props.updateAltaMapState){
        this.props.updateAltaMapState()
      }
    })
  }

  hideElement(tag) {
    let elementsArray = this.state.elements
    if(elementsArray.length > 0) {
      elementsArray.map((elements) => {
        if(elements.tags && elements.tags.indexOf(tag) > -1) {
          elements.hidden = elements.hidden ? false : true
        }
        return elementsArray
      })
      this.setState({
        elements: elementsArray
      }, () => {
        if(this.props.updateAltaMapState){
          this.props.updateAltaMapState()
        }
      })
    }
  }

  hideElementById(id) {
    let elementsArray = this.state.elements
    if(elementsArray.length > 0) {
      elementsArray.map((elements) => {
        if(elements.id === id) {
          elements.hidden = elements.hidden ? false : true
        }
        return elementsArray
      })
      this.setState({
        elements: elementsArray
      }, () => {
        if(this.props.updateAltaMapState){
          this.props.updateAltaMapState()
        }
      })
    }
  }

  getElements() {
    return this.state.elements
  }

  getElementsById(id) {
    let element
    let elementsArray = this.state.elements
    if(elementsArray.length > 0) {
      elementsArray.map((elements) => {
        if(elements.id === id) {
          element = elements
        }
        return element
      })
    }
    return element
  }

  getElementsByTag(tag) {
    let element
    let elementsArray = this.state.elements
    if(elementsArray.length > 0) {
      elementsArray.map((elements) => {
        if(elements.tags && elements.tags.indexOf(tag) > -1) {
          element = elements
        }
        return element
      })
    }
    return element
  }

  addMarker(lat,lng,popup) {
    if(lat && lng) {
      const marker = [{
        id: uuid(),
        type: 'marker',
        tags: null,
        options: {popup},
        data: {lat, lng},
      }]
      this.addElements(marker)
    }
  }

  render() {
    const { viewport, elements } = this.state
    return (
      <Map minZoom='4' viewport={viewport} style={{ width:'100%', height: '100%' }}>
        <TileLayer
          url={this.props.tileLayer ? this.props.tileLayer : 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapLeafletDrawer ref={this.leafletDrawer} />
        <MapDrawer ref={this.drawRef} />
        <MapElements
          elements={elements}
        />
      </Map>
    )
  }
}

export default AltaMap
