import React from 'react'
import { FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

const MapDraw = (props) => {
  const { draw } = props
  return (
    <FeatureGroup>
      { draw && draw.active &&
        <EditControl
          position={ draw.position }
          draw={ draw.options }
        />
      }
    </FeatureGroup>
  )
}

export default MapDraw
