import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import uuid from 'uuidv4';
import AddressSearchBar from './components/AddressSearchBar';
import MapElements from './models/MapElements';
import MapElementsComponent from './components/MapElements';
import MapLeafletDrawer from './components/MapLeafletDrawer';
import MapDrawer from './components/MapDrawer';
import ControlPanel from './components/ControlPanel';
import './AltaMap.scss';
const DEFAULT_VIEWPORT = {
  center: [50.270908, 19.039993],
  zoom: 13
};

class AltaMap extends Component {
  constructor(props) {
    super(props);
    this.drawRef = React.createRef();
    this.leafletDrawer = React.createRef();
    this.state = {
      mapElements: new MapElements([]),
      viewport: DEFAULT_VIEWPORT,
      showControlPanel: false
    };
    this.callChangeCallback = this.callChangeCallback.bind(this);
    /***   HANDLERS BINDS    ***/

    this.setViewport = this.setViewport.bind(this);
    this.addElements = this.addElements.bind(this);
    this.hideElements = this.hideElements.bind(this);
    this.hideElementById = this.hideElementById.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.deleteElementById = this.deleteElementById.bind(this);
    this.addMarker = this.addMarker.bind(this);
    /*** END: HANDLERS BINDS ***/
  }
  /*****************  HANDLERS   *********************/


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

  getElements() {
    return this.state.mapElements.getElements();
  }

  getElementsById(id) {
    return this.state.mapElements.getElementsById(id);
  }

  getElementsByTag(tag) {
    return this.state.mapElements.getElementsByTag(tag);
  }

  addElements(elements) {
    let mapElements = this.state.mapElements;
    mapElements.addElements(elements);
    this.setState({
      mapElements: mapElements
    }, () => {
      this.callChangeCallback();
    });
  }

  deleteElement(tag) {
    let mapElements = this.state.mapElements;
    mapElements.deleteElement(tag);
    this.setState({
      mapElements: mapElements
    }, () => {
      this.callChangeCallback();
    });
  }

  deleteElementById(id) {
    let mapElements = this.state.mapElements;
    mapElements.deleteElementById(id);
    this.setState({
      mapElements: mapElements
    }, () => {
      this.callChangeCallback();
    });
  }

  hideElements(tag) {
    let mapElements = this.state.mapElements;
    mapElements.hideElements(tag);
    this.setState({
      mapElements: mapElements
    }, () => {
      this.callChangeCallback();
    });
  }

  hideElementById(id) {
    let mapElements = this.state.mapElements;
    mapElements.hideElementById(id);
    this.setState({
      mapElements: mapElements
    }, () => {
      this.callChangeCallback();
    });
  }

  addMarker(lat, lng, popup) {
    if (lat && lng) {
      const marker = [{
        id: uuid(),
        type: 'marker',
        tags: null,
        options: {
          popup
        },
        data: {
          lat,
          lng
        }
      }];
      this.addElements(marker);
    }
  }
  /* =================  END HANDLERS ===================== */


  callChangeCallback() {
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  toggleControlPanel() {
    const {
      showControlPanel
    } = this.state;
    this.setState({
      showControlPanel: !showControlPanel
    });
  }

  render() {
    const handlers = {
      setViewport: this.setViewport,
      getElementsById: this.getElementsById,
      getElementsByTag: this.getElementsByTag,
      addElements: this.addElements,
      hideElements: this.hideElements,
      hideElementById: this.hideElementById,
      deleteElement: this.deleteElement,
      deleteElementById: this.deleteElementById,
      addMarker: this.addMarker,
      drawRef: this.drawRef,
      leafletDrawer: this.leafletDrawer,
      props: this.props
    };
    const {
      viewport,
      mapElements,
      showControlPanel
    } = this.state;
    const {
      controlPanel,
      searchAddress,
      googleAPI
    } = this.props;
    let mainClass = 'altalogy-map';

    if (showControlPanel) {
      mainClass = mainClass + ' control-panel-active';
    }

    return React.createElement("div", {
      className: mainClass,
      style: {
        width: '100%',
        height: '100%'
      }
    }, React.createElement(Map, {
      minZoom: "4",
      viewport: viewport,
      style: {
        width: '100%',
        height: '100%'
      }
    }, React.createElement(TileLayer, {
      url: this.props.tileLayer ? this.props.tileLayer : 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
    }), React.createElement(MapLeafletDrawer, {
      ref: this.leafletDrawer
    }), React.createElement(MapDrawer, {
      ref: this.drawRef
    }), React.createElement(MapElementsComponent, {
      mapElements: mapElements
    })), React.createElement(ControlPanel, {
      controlPanel: controlPanel,
      toggleControlPanel: () => this.toggleControlPanel(),
      mapElements: mapElements,
      handlers: handlers,
      searchAddress: searchAddress,
      googleAPI: googleAPI
    }), searchAddress && searchAddress.enabled !== false && searchAddress.position !== 'controlPanel' && React.createElement(AddressSearchBar, {
      searchAddress: searchAddress,
      mapElements: mapElements,
      handlers: handlers,
      googleAPI: googleAPI
    }));
  }

}

export default AltaMap;