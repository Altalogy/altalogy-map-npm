import React from 'react'
import _ from 'lodash'
import { FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

const DRAW_OPTION = {
  rectangle:'rectangle',
  polyline:'polyline',
  circle:'circle',
  circlemarker:'circlemarker',
  marker:'marker',
  polygon:'polygon'
}

const DRAW_MENU_POSITION = {
  topleft:'topleft',
  topright:'topright',
  bottomright:'bottomright',
  bottomleft:'bottomleft'
}

class MapLeafletDrawer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mapLeafletDrawer: {
        active: false,
        position: 'topright',
        options: {},
      },
    }

    this.setMapLeafletDrawer = this.setMapLeafletDrawer.bind(this)
  }

  setMapLeafletDrawer(pos,option) {
    let position = null
    let options = null
    if(_.hasIn(DRAW_MENU_POSITION,pos)) {
      position = pos
    }
    if(_.hasIn(DRAW_OPTION,option)) {
      options = { [option] : false }
    } else if (option) {
      options = option
    }
    this.setState({
      mapLeafletDrawer: {
        active: pos || option ? true : false,
        position: position ? position : 'topright',
        options: option ? options : {}
      }
    })
  }

  render () {
    const { mapLeafletDrawer } = this.state
    return (
      <FeatureGroup>
        { mapLeafletDrawer.active &&
          <EditControl
            position={ mapLeafletDrawer.position }
            draw={ mapLeafletDrawer.options }
          />
        }
      </FeatureGroup>
    )
  }
}

export default MapLeafletDrawer
