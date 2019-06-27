import React from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

class MapLeafletDraw extends React.Component {
  render() {
    const {
      draw
    } = this.props;
    return React.createElement(FeatureGroup, null, draw && draw.active && React.createElement(EditControl, {
      position: draw.position,
      draw: draw.options
    }));
  }

}

export default MapLeafletDraw;