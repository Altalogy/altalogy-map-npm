import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
const ADDRESS_POINTS = [[-37.8839, 175.3657417333, "571"], [-37.8869090667, 175.3657417333, "486"], [-37.8894207167, 175.4015351167, "807"], [-37.8927369333, 175.4087452333, "899"], [-37.90585105, 175.4453463833, "1273"], [-37.9064188833, 175.4441556833, "1258"], [-37.90584715, 175.4463564333, "1279"], [-37.9033391333, 175.4244005667, "1078"], [-37.9061991333, 175.4492620333, "1309"], [-37.9058955167, 175.4445613167, "1261"], [-37.88888045, 175.39146475, "734"]];
const options = [{
  value: 'heatmap',
  label: 'Heatmap'
}, {
  value: 'group_markers',
  label: 'Markers Group'
}, {
  value: 'marker',
  label: 'Marker'
}];

class AddData extends Component {
  constructor(props) {
    super(props);

    this.handleChange = selectedOption => {
      this.setState({
        selectedOption
      });
    };

    this.state = {
      selectedOption: null,
      heatmap: ADDRESS_POINTS,
      groupMarkers: [],
      marker: {}
    };
    this.updateHeatmapValue = this.updateHeatmapValue.bind(this);
  }

  updateHeatmapValue(e) {
    let value = e.target.value;
    let data = [];
    let elementArray = [];
    let number = 1;

    if (value.charAt(0) !== '[') {
      let heatmapValueArray = JSON.parse('[' + value + ']');
      heatmapValueArray.map(x => {
        elementArray.push(x);

        if (number % 3 === 0) {
          data.push(elementArray);
          elementArray = [];
        }

        number += 1;
        return data;
      });
    } else if (value.charAt(0) === '[') {
      var res = value.split(/[[\]]/);
      res.map(x => {
        if (x.charAt(0) === '-' || x.charAt(0) >= '0' && x.charAt(0) <= '9') {
          let y = JSON.parse('[' + x + ']');
          data.push(y);
        }

        return data;
      });
    }

    this.setState({
      heatmap: data
    });
  }

  addGroupMarker() {
    let group = this.state.groupMarkers;
    let marker = {
      lat: '',
      lng: '',
      popup: ''
    };
    group.push(marker);
    this.setState({
      groupMarkers: group
    });
  }

  setMarker(e, type) {
    this.setState({
      marker: { ...this.state.marker,
        [type]: e.target.value
      }
    });
  }

  setGroupMarker(e, type, idx) {
    let group = this.state.groupMarkers;
    group[idx][type] = e.target.value;
    this.setState({
      groupMarkers: group
    });
  }

  getOptionComponent() {
    const {
      selectedOption,
      heatmap,
      marker,
      groupMarkers
    } = this.state;

    switch (selectedOption.value) {
      case 'heatmap':
        return React.createElement("div", {
          className: "heatmap"
        }, React.createElement("textarea", {
          name: "message",
          value: heatmap,
          onChange: this.updateHeatmapValue,
          rows: "10",
          cols: "30"
        }));

      case 'group_markers':
        return React.createElement("div", {
          className: "group_markers"
        }, groupMarkers.map((m, idx) => {
          return React.createElement("div", {
            key: `marker-${idx}`,
            className: "marker"
          }, React.createElement("input", {
            type: "text",
            value: m.lat,
            onChange: e => this.setGroupMarker(e, 'lat', idx),
            placeholder: "Lat"
          }), React.createElement("input", {
            type: "text",
            value: m.lng,
            onChange: e => this.setGroupMarker(e, 'lng', idx),
            placeholder: "Lng"
          }), React.createElement("input", {
            type: "text",
            value: m.popup,
            onChange: e => this.setGroupMarker(e, 'popup', idx),
            placeholder: "Text marker"
          }));
        }), React.createElement("button", {
          className: "btn btn--text",
          onClick: () => this.addGroupMarker()
        }, "Add marker"));

      case 'marker':
        return React.createElement("div", {
          className: "marker"
        }, React.createElement("input", {
          type: "text",
          value: marker.lat,
          onChange: e => this.setMarker(e, 'lat'),
          placeholder: "Lat"
        }), React.createElement("input", {
          type: "text",
          value: marker.lng,
          onChange: e => this.setMarker(e, 'lng'),
          placeholder: "Lng"
        }), React.createElement("input", {
          type: "text",
          value: marker.popup,
          onChange: e => this.setMarker(e, 'popup'),
          placeholder: "Text marker"
        }));

      default:
    }
  }

  confirmAddData() {
    const {
      selectedOption,
      heatmap,
      marker,
      groupMarkers
    } = this.state;
    const {
      handlers
    } = this.props;

    if (selectedOption.value === 'heatmap') {
      let data = [{
        type: 'heatmap',
        data: heatmap
      }];

      if (heatmap) {
        handlers.addElements(data);
      }
    } else if (selectedOption.value === 'group_markers') {
      let data = [{
        type: 'group_markers',
        data: groupMarkers
      }];

      if (groupMarkers) {
        handlers.addElements(data);
      }
    } else if (selectedOption.value === 'marker') {
      if (marker.lat && marker.lng) {
        handlers.addMarker(marker.lat, marker.lng, marker.popup);
      }
    }
  }

  render() {
    const {
      selectedOption
    } = this.state;
    return React.createElement("div", {
      className: "add__data"
    }, React.createElement("h2", null, "Add Element"), React.createElement(Select, {
      className: "select",
      classNamePrefix: "select",
      value: selectedOption,
      onChange: this.handleChange,
      options: options
    }), selectedOption && selectedOption.value && this.getOptionComponent(), selectedOption && selectedOption.value ? React.createElement("button", {
      className: "btn btn--primary",
      onClick: () => {
        this.confirmAddData();
      }
    }, "Submit") : React.createElement("button", {
      className: "btn btn--disabled",
      disabled: true
    }, "Submit"));
  }

}

AddData.propTypes = {
  handlers: PropTypes.object
};
export default AddData;