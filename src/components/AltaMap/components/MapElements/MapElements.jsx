import React, { Component } from 'react'
import Heatmap from '../Heatmaps'
import MapMarker from '../MapMarker'
import uuid from 'uuidv4'

class MapElements extends Component {
  constructor(props) {
    super(props)
  }

  getMapElements() {
    const { maps, markers } = this.props
    if( maps.length > 0 ) {
      return(
        maps.map((mapObject, idx) => {
          if(mapObject.type === 'heatmap') {
            return (
              <div className='heatmaps' key={idx} id={idx}>
                <Heatmap
                  heatmap={mapObject}
                />
              </div>
            )
          } else if(mapObject.type === 'group_markers') {
            mapObject.data.map((marker) => (
              markers.push({
                id: uuid(),
                position: {lat:marker.lat,lng:marker.lng},
                text: marker.popup
              })
            ))
          } else if(mapObject.type === 'marker') {
            markers.push({
              id: uuid(),
              position: {lat:mapObject.data[0].lat,lng:mapObject.data[0].lng},
              text: mapObject.data[0].popup
            })
          }
        })
      )
    }
  }

  render() {
    const { markers } = this.props
    return (
      <div>
        <MapMarker
          markers={markers}
        />
        { this.getMapElements() }
      </div>
    )
  }
}

export default MapElements
