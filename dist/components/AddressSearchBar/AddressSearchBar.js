import React from 'react';
import Geosuggest from 'react-geosuggest';
import './AddressSearchBar.scss';
let interval;

class AddressSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script: false
    };
    this.checkScript = this.checkScript.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
  }

  componentDidMount() {
    const {
      googleAPI,
      searchAddress
    } = this.props;

    if (googleAPI && searchAddress && searchAddress.enabled !== false) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleAPI}&libraries=places`;
      script.async = false;
      document.body.appendChild(script);
    }

    interval = setInterval(this.checkScript, 1000);
  }

  checkScript() {
    if (window.google) {
      this.setState({
        script: true
      });
      clearInterval(interval);
    }
  }

  onSuggestSelect(suggest) {
    if (suggest && suggest.location) {
      this.props.altaRef.current.addMarker(suggest.location.lat, suggest.location.lng);
    }
  }

  render() {
    const {
      searchAddress
    } = this.props;

    if (!searchAddress || searchAddress.enabled === false || !window.google) {
      return '';
    }

    return React.createElement("div", {
      className: "search__bar"
    }, this.state.script && React.createElement(Geosuggest, {
      ref: el => this._geoSuggest = el,
      placeholder: "Start searching...",
      onSuggestSelect: this.onSuggestSelect,
      location: new window.google.maps.LatLng(53.558572, 9.9278215),
      radius: "20"
    }));
  }

}

export default AddressSearchBar;