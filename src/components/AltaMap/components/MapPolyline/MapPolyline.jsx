import React from 'react'
import { Polyline } from 'react-leaflet'

const MapPolyline = (props) => {
  const { data } = props
  return (
    <Polyline
      id={data.id}
      positions={data.positions}
    />
  )
}

export default MapPolyline
