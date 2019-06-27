import React from 'react'
import { EditControl } from 'react-leaflet-draw'
import { FeatureGroup } from 'react-leaflet'
import './MapDrawer.scss'

class MapDrawer extends React.Component {
  render () {
    const {mapDrawerSettings, mapDrawer} = this.props
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
