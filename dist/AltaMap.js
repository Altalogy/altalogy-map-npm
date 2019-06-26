import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import _ from 'lodash';
import MapMarker from './components/MapMarker';
import MapDraw from './components/MapDraw';
import CustomMapDraw from './components/CustomMapDraw';
import Heatmap from './components/Heatmaps';
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
export class AltaMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maps: [],
      viewport: DEFAULT_VIEWPORT,
      markers: [],
      draw: {
        active: false,
        position: 'topright',
        options: {}
      },
      customDrawing: '',
      editable: false,
      remove: false,
      customDrawSettings: {},
      customDrawData: {}
    };
    window.react_map = {
      _customDrawRef: null
    };
    this.setMaps = this.setMaps.bind(this);
    this.setViewport = this.setViewport.bind(this);
    this.setCustomDraw = this.setCustomDraw.bind(this);
    this.setCustomDrawSettings = this.setCustomDrawSettings.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.customDraw = this.customDraw.bind(this);
    this.editCustomDraw = this.editCustomDraw.bind(this);
    this.removeCustomDraw = this.removeCustomDraw.bind(this);
    this.getCustomDrawData = this.getCustomDrawData.bind(this);
    this.cancelCustomDraw = this.cancelCustomDraw.bind(this);
  }

  setMaps(maps) {
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

  customDraw(x) {
    window.react_map._customDrawRef = x;
  }

  getCustomDrawData() {
    this.setState({
      customDrawData: window.react_map._customDrawRef.leafletElement.options.edit.featureGroup._layers
    }, () => {
      return this.state.customDrawData;
    });
  }

  setCustomDraw(option) {
    const {
      editable,
      remove,
      customDrawing
    } = this.state;

    if (editable) {
      this.editCustomDraw();
    } else if (remove) {
      this.removeCustomDraw();
    }

    if (_.hasIn(DRAW_OPTION, option)) {
      window.react_map._customDrawRef.leafletElement._toolbars.draw._modes[option].handler.enable();

      this.setState({
        customDrawing: option
      });
    }

    this.getCustomDrawData();
  }

  cancelCustomDraw() {
    const {
      customDrawing
    } = this.state;

    if (_.hasIn(DRAW_OPTION, customDrawing)) {
      window.react_map._customDrawRef.leafletElement._toolbars.draw._modes[customDrawing].handler.disable();

      this.setState({
        customDrawing: ''
      });
    }
  }

  editCustomDraw() {
    if (window.react_map && window.react_map._customDrawRef && this.state.editable === false) {
      this.setState({
        editable: true
      });

      window.react_map._customDrawRef.leafletElement._toolbars.edit._modes.edit.handler.enable();
    } else {
      this.setState({
        editable: false
      });

      window.react_map._customDrawRef.leafletElement._toolbars.edit._modes.edit.handler.disable();
    }
  }

  removeCustomDraw() {
    if (window.react_map && window.react_map._customDrawRef && this.state.remove === false) {
      this.setState({
        remove: true
      });

      window.react_map._customDrawRef.leafletElement._toolbars.edit._modes.remove.handler.enable();
    } else {
      this.setState({
        remove: false
      });

      window.react_map._customDrawRef.leafletElement._toolbars.edit._modes.remove.handler.disable();
    }
  }

  setDraw(pos, option) {
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

  setCustomDrawSettings(options) {
    if (options) {
      this.setState({
        customDrawSettings: options
      });
    }
  }

  addMarker(lat, lng, text) {
    if (lat && lng) {
      const marker = {
        position: [lat, lng],
        text: text
      };
      this.setState({
        markers: [...this.state.markers, marker]
      });
    }
  }

  getMaps() {
    const {
      maps,
      markers
    } = this.state;

    if (maps.length > 0) {
      return maps.map((mapObject, idx) => {
        if (mapObject.type === 'heatmap') {
          return React.createElement("div", {
            className: "heatmaps",
            key: idx,
            id: idx
          }, React.createElement(Heatmap, {
            heatmap: mapObject
          }));
        } else if (mapObject.type === 'markers') {
          mapObject.data.map(marker => markers.push({
            position: [marker.lat, marker.lng],
            text: marker.popup
          }));
        }
      });
    }
  }

  render() {
    const {
      viewport,
      markers,
      draw,
      customDrawSettings
    } = this.state;
    return React.createElement("div", {
      className: "AltaMap"
    }, React.createElement(Map, {
      viewport: viewport,
      style: {
        width: '100%',
        height: '100%'
      }
    }, React.createElement(TileLayer, {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
    }), React.createElement(MapDraw, {
      draw: draw
    }), React.createElement(CustomMapDraw, {
      finderAreaDrawElement: this.finderAreaDrawElement,
      customDraw: this.customDraw,
      getCustomDrawData: this.getCustomDrawData,
      customDrawSettings: customDrawSettings
    }), React.createElement(MapMarker, {
      markers: markers
    }), this.getMaps()));
  }

}
export default AltaMap;