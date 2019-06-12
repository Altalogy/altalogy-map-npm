import React from 'react'
import PropTypes from 'prop-types'
import { Marker, Popup } from 'react-leaflet'

const MapMarker = (props) => {
  const { markers } = props
  return (
    <div>
      { markers && markers.length > 0 &&
        markers.map((marker) => (
          <div>
          { marker && marker.position &&
            <Marker position={marker.position}>
              { marker.text &&
                <Popup>
                  {marker.text}
                </Popup>
              }
            </Marker>
          }
          </div>
        ))
      }
    </div>
  )
}

export default MapMarker
