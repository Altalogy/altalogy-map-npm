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
    this.editMapDrawer = this.editMapDrawer.bind(this)
    this.removeMapDrawer = this.removeMapDrawer.bind(this)
    this.getMapDrawerData = this.getMapDrawerData.bind(this)
    this.cancelMapDrawer = this.cancelMapDrawer.bind(this)
  }

  mapDrawer(x) {
    window.react_map._mapDrawerRef = x
  }

  getMapDrawerData() {
    this.setState({
      mapDrawerData: window.react_map._mapDrawerRef.leafletElement.options.edit.featureGroup._layers
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

  editMapDrawer() {
    if(window.react_map && window.react_map._mapDrawerRef && this.state.editable === false) {
      this.setState({
        editable: true
      })
      window.react_map._mapDrawerRef.leafletElement._toolbars.edit._modes.edit.handler.enable()
    } else {
      this.setState({
        editable: false
      })
      window.react_map._mapDrawerRef.leafletElement._toolbars.edit._modes.edit.handler.disable()
    }
  }

  removeMapDrawer() {
    if(window.react_map && window.react_map._mapDrawerRef && this.state.removable === false) {
      this.setState({
        removable: true
      })
      window.react_map._mapDrawerRef.leafletElement._toolbars.edit._modes.remove.handler.enable()
    } else {
      this.setState({
        removable: false
      })
      window.react_map._mapDrawerRef.leafletElement._toolbars.edit._modes.remove.handler.disable()
    }
  }

  render () {
    const {mapDrawerSettings, mapDrawer} = this
    return (
      <div className='custom__map'>
        <FeatureGroup>
          <EditControl
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
