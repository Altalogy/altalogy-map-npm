import React from 'react'
import _ from 'lodash'
import { EditControl } from 'react-leaflet-draw'
import { FeatureGroup } from 'react-leaflet'
import './MapDrawer.scss'

const DRAW_OPTION = {
  rectangle:'rectangle',
  polyline:'polyline',
  circle:'circle',
  circlemarker:'circlemarker',
  marker:'marker',
  polygon:'polygon'
}

class MapDrawer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mapDrawer: '',
      editable: false,
      removable: false,
      mapDrawerSettings: {},
      mapDrawerData: {},
    }

    window.react_map = { _mapDrawerRef: null }
    this.setMapDrawer = this.setMapDrawer.bind(this)
    this.setMapDrawerSettings = this.setMapDrawerSettings.bind(this)
    this.mapDrawer = this.mapDrawer.bind(this)
    this.getMapDrawerData = this.getMapDrawerData.bind(this)
    this.cancelMapDrawer = this.cancelMapDrawer.bind(this)
  }

  mapDrawer(x) {
    window.react_map._mapDrawerRef = x
  }

  onDrawStop() {
    let exist = false
    let element
    const { mapElements } = this.props
    const data = window.react_map._mapDrawerRef.leafletElement.options.edit.featureGroup._layers
    Object.keys(data).map((x) => {
      window.react_map._mapDrawerRef.leafletElement._map.removeLayer(data[x])
    })
    this.setState({
      mapDrawerData: data
    }, () => {
      Object.keys(data).map((x) => {
        mapElements.map((el) => {
          if(el.id === x){ return exist = true }
          return ''
        })
        if(!exist) {
          if(_.hasIn(data[x], '_mRadius')){
            element = [{
              id: x,
              type: 'circle',
              tags: null,
              options: {},
              data: {lat: data[x]._latlng.lat, lng: data[x]._latlng.lng, radius: data[x]._mRadius },
            }]
          } else if(data[x]._latlngs.length > 1) {
            element = [{
              id: x,
              type: 'polyline',
              tags: null,
              options: {},
              data: {latLng: data[x]._latlngs},
            }]
          } else {
            element = [{
              id: x,
              type: 'polygon',
              tags: null,
              options: {},
              data: {latLng: data[x]._latlngs},
            }]
          }
          this.props.addElements(element)
        }
        exist = false
        return ''
      })
    })
  }

  getMapDrawerData() {
    const data = window.react_map._mapDrawerRef.leafletElement.options.edit.featureGroup._layers
    this.setState({
      mapDrawerData: data
    }, () => {
      return (
        this.state.mapDrawerData
      )
    })
  }

  setMapDrawer(option) {
    const { editable, removable, } = this.state
    if( editable ) {
      this.editMapDrawer()
    } else if ( removable ) {
      this.removeMapDrawer()
    }
    if(_.hasIn(DRAW_OPTION,option)) {
      window.react_map._mapDrawerRef.leafletElement._toolbars.draw._modes[option].handler.enable()
      this.setState({
        mapDrawer: option
      })
    }
    this.getMapDrawerData()
  }

  setMapDrawerSettings(options) {
    if(options) {
      this.setState({
        mapDrawerSettings: options
      })
    }
  }

  cancelMapDrawer() {
    const { mapDrawer } = this.state
    if(_.hasIn(DRAW_OPTION,mapDrawer)) {
      window.react_map._mapDrawerRef.leafletElement._toolbars.draw._modes[mapDrawer].handler.disable()
      this.setState({
        mapDrawer: '',
      })
    }
  }

  render () {
    const {mapDrawerSettings, mapDrawer} = this
    return (
      <div className='custom__map'>
        <FeatureGroup>
          <EditControl
            onDrawStop={() => this.onDrawStop()}
            position='topleft'
            ref={el => mapDrawer(el)}
            draw={mapDrawerSettings}
          />
        </FeatureGroup>
      </div>
    )
  }
}

export default MapDrawer
