import React, { Component } from 'react'
import './App.scss'
import AltaMap from './components/AltaMap'

// const ADDRESS_POINTS = [
//   [-37.8839, null, "571"],
//   [-37.8869090667, 175.3657417333, "486"],
//   [-37.8894207167, 175.4015351167, "807"],
//   [-37.8927369333, 175.4087452333, "899"],
//   [-37.90585105, 175.4453463833, "1273"],
//   [-37.9064188833, 175.4441556833, "1258"],
//   [-37.90584715, 175.4463564333, "1279"],
//   [-37.9033391333, 175.4244005667, "1078"],
//   [-37.9061991333, 175.4492620333, "1309"],
//   [-37.9058955167, 175.4445613167, "1261"],
//   [-37.88888045, 175.39146475, "734"],
// ]

// const data = [{
//   id: '12345',
//   type: 'heatmap',
//   tags: ['heatmap'],
//   data: ADDRESS_POINTS,
// },
// {
//   type: 'group_markers',
//   tags: ['group'],
//   data: [
//     {lat:'50.270908',lng: '19.039993',popup: 'KATOWICE NOCĄ BO MOCĄ '},
//     {lat:'50.170908',lng: '18.939993',popup: 'xxxxx '},
//     {lat:'49.270908',lng: '18.039993',popup: 'aaaa '},
//     {lat:'50.250908',lng: '19.029993',popup: 'zzzz '},
//   ]
// }]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didMount: false,
      elements: []
    }
    this.updateAltaMapState = this.updateAltaMapState.bind(this)
    this.altaRef = React.createRef()
  }

  componentDidMount() {
    if(this.altaRef.current){
      this.setState({
        didMount: !this.state.didMount
      })
    }
    this.altaRef.current.addMarker('50.270908', '19.039993','Katowice')
  }

  updateAltaMapState() {
    let elements = this.altaRef.current.getElements()
    this.setState({
      elements: elements
    })
  }

  render() {
    return (
      <div className="App">
        <div style={{ width: '100%', height: '100vh'}}>
          <AltaMap
            ref={this.altaRef}
            onChange={this.updateAltaMapState}
            controlPanel={{
              enabled: true,
              title: 'AltaMap',
            }}
            searchAddress={{
              enabled: true,
              position: 'top',
            }}
            googleAPI='PUT_KEY_HERE'
          />
        </div>
      </div>
    )
  }
}

export default App
