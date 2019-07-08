import React from 'react'
import { Marker, Popup } from 'react-leaflet'

const MapMarker = (props) => {
  const { marker } = props
  return (
    <Marker id={marker.id} position={marker.position}>
      { marker.popup &&
        <Popup>
          {marker.popup}
        </Popup>
      }
    </Marker>
  )
}

export default MapMarker
