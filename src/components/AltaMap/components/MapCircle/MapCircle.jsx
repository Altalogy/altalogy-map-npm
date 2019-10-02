import React from 'react'
import { Circle } from 'react-leaflet'

const MapCircle = (props) => {
  const { data } = props
  return (
    <Circle
      id={data.id}
      center={data.center}
      radius={data.radius}
    />
  )
}

export default MapCircle
