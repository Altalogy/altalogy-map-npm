import React from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

const MapDraw = props => {
  const {
    draw
  } = props;
  return React.createElement(FeatureGroup, null, draw && draw.active && React.createElement(EditControl, {
    position: draw.position,
    draw: draw.options
  }));
};

export default MapDraw;