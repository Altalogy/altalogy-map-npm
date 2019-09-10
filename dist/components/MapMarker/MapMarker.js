import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const MapMarker = props => {
  const {
    marker
  } = props;
  return React.createElement(Marker, {
    id: marker.id,
    position: marker.position
  }, marker.popup && React.createElement(Popup, null, marker.popup));
};

export default MapMarker;