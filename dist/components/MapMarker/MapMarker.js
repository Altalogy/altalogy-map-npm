import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const MapMarker = props => {
  const {
    markers
  } = props;
  return React.createElement("div", null, markers && markers.length > 0 && markers.map(marker => React.createElement("div", null, marker && marker.position && React.createElement(Marker, {
    id: marker.id,
    position: marker.position
  }, marker.text && React.createElement(Popup, null, marker.text)))));
};

export default MapMarker;