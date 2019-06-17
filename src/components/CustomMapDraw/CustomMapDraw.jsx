import React from 'react'
import { EditControl } from 'react-leaflet-draw'
import { FeatureGroup } from 'react-leaflet'
import './CustomMapDraw.scss'

class CustomMapDraw extends React.Component {
  render () {
    const {customDrawSettings, customDraw} = this.props
    return (
      <FeatureGroup>
        <EditControl
          ref={el => customDraw(el)}
          draw={customDrawSettings}
        />
      </FeatureGroup>
    )
  }
}

export default CustomMapDraw
