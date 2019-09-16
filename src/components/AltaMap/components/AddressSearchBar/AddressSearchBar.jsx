import React from 'react'
import PropTypes from 'prop-types'
import Geosuggest from 'react-geosuggest'
import './AddressSearchBar.scss'

let interval

class AddressSearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      script: false,
    }
    this.checkScript = this.checkScript.bind(this)
    this.onSuggestSelect = this.onSuggestSelect.bind(this)
  }
  componentWillMount () {
    const { googleAPI, enabled } = this.props
    if(googleAPI && enabled ) {
      const script = document.createElement("script");

      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleAPI}&libraries=places`;
      script.async = false;

      document.body.appendChild(script);
    }
  }

  componentDidMount() {
    interval = setInterval(this.checkScript, 1000)
  }

  checkScript() {
    if(window.google){
      this.setState({
        script: true
      })
      clearInterval(interval)
    }
  }

  onSuggestSelect(suggest) {
    if(suggest && suggest.location) {
      this.props.altaRef.current.addMarker(suggest.location.lat,suggest.location.lng)
    }
  }

  render () {
    const { enabled } = this.props
    if (!enabled  || !window.google) { return '' }
    return (
      <div className='search__bar'>
        { this.state.script &&
          <Geosuggest
            ref={el => this._geoSuggest=el}
            placeholder="Start searching..."
            onSuggestSelect={this.onSuggestSelect}
            location={new window.google.maps.LatLng(53.558572, 9.9278215)}
            radius='20'
            />
        }
      </div>
    );
  }
}

export default AddressSearchBar;
