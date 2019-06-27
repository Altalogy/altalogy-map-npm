import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import _ from 'lodash';
import uuid from 'uuidv4';
import MapElements from './components/MapElements';
import MapLeafletDrawer from './components/MapLeafletDrawer';
import MapDrawer from './components/MapDrawer';
import './AltaMap.scss';
const DEFAULT_VIEWPORT = {
  center: [50.270908, 19.039993],
  zoom: 13
};
const DRAW_OPTION = {
  rectangle: 'rectangle',
  polyline: 'polyline',
  circle: 'circle',
  circlemarker: 'circlemarker',
  marker: 'marker',
  polygon: 'polygon'
};
const DRAW_MENU_POSITION = {
  topleft: 'topleft',
  topright: 'topright',
  bottomright: 'bottomright',
  bottomleft: 'bottomleft'
};

class AltaMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maps: [],
      viewport: DEFAULT_VIEWPORT,
      markers: [],
      mapLeafletDrawer: {
        active: false,
        position: 'topright',
        options: {}
      },
      mapDrawer: '',
      editable: false,
      removable: false,
      mapDrawerSettings: {},
      mapDrawerData: {}
    };
    window.react_map = {
      _mapDrawerRef: null
    };
    this.addElements = this.addElements.bind(this);
    this.setViewport = this.setViewport.bind(this);
    this.setMapDrawer = this.setMapDrawer.bind(this);
    this.setMapDrawerSettings = this.setMapDrawerSettings.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.mapDrawer = this.mapDrawer.bind(this);
    this.editMapDrawer = this.editMapDrawer.bind(this);
    this.removeMapDrawer = this.removeMapDrawer.bind(this);
    this.getMapDrawerData = this.getMapDrawerData.bind(this);
    this.cancelMapDrawer = this.cancelMapDrawer.bind(this);
  }

  addElements(maps) {
    this.setState({
      maps: maps
    });
  }

  setViewport(lat, lng, zoom) {
    if (lat && lng && zoom) {
      this.setState({
        viewport: {
          center: [lat, lng],
          zoom: [zoom]
        }
      });
    }
  }

  mapDrawer(x) {
    window.react_map._mapDrawerRef = x;
  }

  getMapDrawerData() {
    this.setState({
      mapDrawerData: window.react_map._mapDrawerRef.leafletElement.options.edit.featureGroup._layers
    }, () => {
      return this.state.mapDrawerData;
    });
  }

  setMapDrawer(option) {
    const {
      editable,
      removable,
      mapDrawer
    } = this.state;

    if (editable) {
      this.editMapDrawer();
    } else if (removable) {
      this.removeMapDrawer();
    }

    if (_.hasIn(DRAW_OPTION, option)) {
      window.react_map._mapDrawerRef.leafletElement._toolbars.draw._modes[option].handler.enable();

      this.setState({
        mapDrawer: option
      });
    }

    this.getMapDrawerData();
  }

  cancelMapDrawer() {
    const {
      mapDrawer
    } = this.state;

    if (_.hasIn(DRAW_OPTION, mapDrawer)) {
      window.react_map._mapDrawerRef.leafletElement._toolbars.draw._modes[mapDrawer].handler.disable();

      this.setState({
        mapDrawer: ''
      });
    }
  }

  editMapDrawer() {
    if (window.react_map && window.react_map._mapDrawerRef && this.state.editable === false) {
      this.setState({
        editable: true
      });

      window.react_map._mapDrawerRef.leafletElement._toolbars.edit._modes.edit.handler.enable();
    } else {
      this.setState({
        editable: false
      });

      window.react_map._mapDrawerRef.leafletElement._toolbars.edit._modes.edit.handler.disable();
    }
  }

  removeMapDrawer() {
    if (window.react_map && window.react_map._mapDrawerRef && this.state.remove === false) {
      this.setState({
        remove: true
      });

      window.react_map._mapDrawerRef.leafletElement._toolbars.edit._modes.remove.handler.enable();
    } else {
      this.setState({
        remove: false
      });

      window.react_map._mapDrawerRef.leafletElement._toolbars.edit._modes.remove.handler.disable();
    }
  }

  setMapLeafletDrawer(pos, option) {
    let position = null;
    let options = null;

    if (_.hasIn(DRAW_MENU_POSITION, pos)) {
      position = pos;
    }

    if (_.hasIn(DRAW_OPTION, option)) {
      options = {
        [option]: false
      };
    } else if (option) {
      options = option;
    }

    this.setState({
      draw: {
        active: pos || option ? true : false,
        position: position ? position : 'topright',
        options: option ? options : {}
      }
    });
  }

  setMapDrawerSettings(options) {
    if (options) {
      this.setState({
        mapDrawerSettings: options
      });
    }
  }

  addMarker(lat, lng, text) {
    if (lat && lng) {
      const marker = {
        id: uuid(),
        position: {
          lat,
          lng
        },
        text: text
      };
      this.setState({
        markers: [...this.state.markers, marker]
      });
    }
  }

  render() {
    const {
      viewport,
      markers,
      mapLeafletDrawer,
      mapDrawerSettings,
      maps
    } = this.state;
    return React.createElement("div", {
      className: "AltaMap"
    }, React.createElement(Map, {
      minZoom: "4",
      viewport: viewport,
      style: {
        width: '100%',
        height: '100%'
      }
    }, React.createElement(TileLayer, {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
    }), React.createElement(MapLeafletDrawer, {
      mapLeafletDrawer: mapLeafletDrawer
    }), React.createElement(MapDrawer, {
      mapDrawer: this.mapDrawer,
      getMapDrawerData: this.getMapDrawerData,
      mapDrawerSettings: mapDrawerSettings
    }), React.createElement(MapElements, {
      markers: markers,
      maps: maps
    })));
  }

}

export default AltaMap;