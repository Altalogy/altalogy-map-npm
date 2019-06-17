import React from 'react'
import HeatmapLayer from 'react-leaflet-heatmap-layer'

class Heatmap extends React.Component {
  render () {
    const { heatmap } = this.props
    return (
      <HeatmapLayer
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={heatmap.data}
        longitudeExtractor={m => m[1]}
        latitudeExtractor={m => m[0]}
        intensityExtractor={m => parseFloat(m[2])}
      />
    )
  }
}

export default Heatmap
