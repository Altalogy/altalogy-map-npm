import React from 'react'
import { Polygon } from 'react-leaflet'

const MapPolygon = (props) => {
  const { data } = props
  return (
    <Polygon
      id={data.id}
      positions={data.positions}
    />
  )
}

export default MapPolygon
