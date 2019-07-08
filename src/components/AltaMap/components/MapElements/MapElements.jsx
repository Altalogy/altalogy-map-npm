import React, { Component } from 'react'
import uuid from 'uuidv4'
import Heatmap from '../Heatmaps'
import MapMarker from '../MapMarker'

class MapElements extends Component {

  getMapElements() {
    const { elements } = this.props
    if( elements.length > 0 ) {
      return(
        elements.map((mapObject, idx) => {
          if(!mapObject.hidden) {
            if(mapObject.type === 'heatmap') {
              return (
                <div className='heatmap__element' key={uuid()}>
                  <Heatmap
                    heatmap={mapObject}
                    />
                </div>
              )
            } else if(mapObject.type === 'group_markers') {
              return (
                mapObject.data.map((data) => (
                  <div className='marker__element' key={uuid()}>
                    <MapMarker
                      marker={{
                        id: mapObject.id,
                        position: {lat:data.lat,lng:data.lng},
                        popup: data && data.popup ? data.popup : '',
                      }}
                      />
                  </div>
                ))
              )
            } else if(mapObject.type === 'marker') {
              return (
                <div className='marker__element' key={uuid()}>
                  <MapMarker
                    marker={{
                      id: mapObject.id,
                      position: {lat:mapObject.data.lat,lng:mapObject.data.lng},
                      popup: mapObject.options && mapObject.options.popup ? mapObject.options.popup : '',
                    }}
                    />
                </div>
              )
            }
          }
          return idx
        })
      )
    }
  }

  render() {
    return (
      <div>
        { this.getMapElements() }
      </div>
    )
  }
}

export default MapElements
