import React from 'react';
import { EditControl } from 'react-leaflet-draw';
import { FeatureGroup } from 'react-leaflet';
import './MapDrawer.scss';

class MapDrawer extends React.Component {
  render() {
    const {
      mapDrawerSettings,
      mapDrawer
    } = this.props;
    return React.createElement("div", {
      className: "custom__map"
    }, React.createElement(FeatureGroup, null, React.createElement(EditControl, {
      position: "topleft",
      ref: el => mapDrawer(el),
      draw: mapDrawerSettings
    })));
  }

}

export default MapDrawer;