import React, { Component } from 'react';
import uuid from 'uuidv4';
import Heatmap from '../Heatmaps';
import MapMarker from '../MapMarker';

class MapElements extends Component {
  getMapElements() {
    const {
      mapElements
    } = this.props;

    if (mapElements.getElements().length > 0) {
      return mapElements.getElements().map((mapObject, idx) => {
        if (!mapObject.hidden) {
          if (mapObject.type === 'heatmap') {
            return React.createElement("div", {
              className: "heatmap__element",
              key: uuid()
            }, React.createElement(Heatmap, {
              heatmap: mapObject
            }));
          } else if (mapObject.type === 'group_markers') {
            return mapObject.data.map(data => React.createElement("div", {
              className: "marker__element",
              key: uuid()
            }, React.createElement(MapMarker, {
              marker: {
                id: mapObject.id,
                position: {
                  lat: data.lat,
                  lng: data.lng
                },
                popup: data && data.popup ? data.popup : ''
              }
            })));
          } else if (mapObject.type === 'marker') {
            return React.createElement("div", {
              className: "marker__element",
              key: uuid()
            }, React.createElement(MapMarker, {
              marker: {
                id: mapObject.id,
                position: {
                  lat: mapObject.data.lat,
                  lng: mapObject.data.lng
                },
                popup: mapObject.options && mapObject.options.popup ? mapObject.options.popup : ''
              }
            }));
          }
        }

        return idx;
      });
    }
  }

  render() {
    return React.createElement("div", null, this.getMapElements());
  }

}

export default MapElements;