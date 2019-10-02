import React, { Component } from 'react'
import uuid from 'uuidv4'
import _ from 'lodash'
import Heatmap from '../Heatmaps'
import MapMarker from '../MapMarker'
import MapCircle from '../MapCircle'
import MapPolygon from '../MapPolygon'
import MapPolyline from '../MapPolyline'
import Modal from '../Modal'
import { FeatureGroup, Popup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import ContextMenu from 'react-context-menu'

const POPUP_CONTENT = {
  title: '',
  description: '',
}

class MapElements extends Component {
  constructor(props) {
    super(props)
    window.react_map = { _mapElementsRef: null }
    this.state = {
      modal: false,
      openPopup: false,
      elementId: null,
      popupContent: [],
      removable: false,
      editable: false,
    }
    this.openModal = this.openModal.bind(this)
    this.confirmContent = this.confirmContent.bind(this)
    this.editControl = this.editControl.bind(this)
    this.removeControl = this.removeControl.bind(this)
    this.mapElementsControl = this.mapElementsControl.bind(this)
  }

  mapElementsControl(x) {
    window.react_map._mapElementsRef = x
  }

  getMapElements() {
    const { mapElements } = this.props
    if( mapElements.getElements().length > 0 ) {
      return(
        mapElements.getElements().map((mapObject, idx) => {
          if(!mapObject.hidden) {
            if(mapObject.type === 'heatmap') {
              return (
                <div className='heatmap__element' key={uuid()}>
                  <Heatmap
                    heatmap={mapObject}
                    />
                </div>
              )
            } else if(mapObject.type === 'group_markers') {
              return (
                mapObject.data.map((data) => (
                  <div className='marker__element' key={uuid()}>
                    <MapMarker
                      marker={{
                        id: mapObject.id,
                        position: {lat:data.lat,lng:data.lng},
                        popup: data && data.popup ? data.popup : '',
                      }}
                      />
                  </div>
                ))
              )
            } else if(mapObject.type === 'marker') {
              return (
                <div className='marker__element' key={uuid()}>
                  <MapMarker
                    marker={{
                      id: mapObject.id,
                      position: {lat:mapObject.data.lat,lng:mapObject.data.lng},
                      popup: mapObject.options && mapObject.options.popup ? mapObject.options.popup : '',
                    }}
                    />
                </div>
              )
            } else if(mapObject.type === 'polyline') {
              return (
                <div className='polyline__element' key={uuid()}>
                  <MapPolyline
                    marker={{
                      id: mapObject.id,
                      positions: mapObject.data.latLng,
                      options: mapObject.options && mapObject.options.popup ? mapObject.options.popup : '',
                    }}
                  />
                </div>
              )
            } else if(mapObject.type === 'polygon') {
              return (
                <div className='polygon__element' key={uuid()}>
                  <MapPolygon
                    data={{
                      id: mapObject.id,
                      positions: mapObject.data.latLng,
                      options: mapObject.options && mapObject.options.popup ? mapObject.options.popup : '',
                    }}
                  />
                </div>
              )
            } else if(mapObject.type === 'circle') {
              return (
                <div className='circle__element' key={uuid()}>
                  <MapCircle
                    data={{
                      id: mapObject.id,
                      center: {lat:mapObject.data.lat,lng:mapObject.data.lng},
                      radius: mapObject.data.radius,
                      options: mapObject.options && mapObject.options.popup ? mapObject.options.popup : '',
                    }}
                    />
                </div>
              )
            }
          }
          return idx
        })
      )
    }
  }

  updatePopupContent() {
    const { popupContent } = this.state
    const { mapElements } = this.props
    let popupArray = popupContent
    let checked = false
    let element
    popupContent.map((x) => {
      element = x
      mapElements.elements.map((y) => {
        if(x.id === y.id){
          checked = true
        }
      })
    })
    if(!checked){
      popupArray.splice(element,1)
      this.setState({
        popupContent: popupArray
      })
    }
  }

  handleElementClick(e) {
    const { popupContent } = this.state
    this.updatePopupContent()
    let element_id = e.sourceTarget.options.id
    this.setState({ elementId: element_id })
    if(popupContent.length > 0) {
      let count = 0
      popupContent.map((x) => {
        if(x.id === element_id) {
          count += 1;
        }
        return true
      })
      if(count === 0) {
        this.setState({ openPopup: false },() => {
          this.openModal()
        })
      }
    } else {
      this.setState({ openPopup: false },() => {
        this.openModal()
      })
    }
  }

  openModal() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  setContent(e){
    if(e.target.placeholder === 'title'){
      POPUP_CONTENT.title = e.target.value
    } else if(e.target.placeholder === 'description'){
      POPUP_CONTENT.description = e.target.value
    }
  }

  confirmContent() {
    const{ modal, popupContent, elementId } = this.state
    let content = {
      id: elementId,
      title: POPUP_CONTENT.title,
      description: POPUP_CONTENT.description
    }
    this.setState({
      popupContent: [
        ...popupContent, content
      ],
      openPopup: true,
    }, () => {if(modal) { this.openModal()}})
  }

  modalRender() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <h1>Add Title</h1>
        <input
          type='text'
          placeholder='title'
          onChange={this.setContent}
        />
        <h1>Add Description</h1>
        <input
          type='text'
          placeholder='description'
          onChange={this.setContent}
        />
        <button className='btn btn--primary' onClick={this.confirmContent}>Submit</button>
      </div>
    )
  }

  popupRender() {
    let content = {
      title: '',
      description: ''
    }
    this.state.popupContent.map((x) => {
      if(x.id === this.state.elementId){
        content.title = x.title
        content.description = x.description
      }
      return content;
    })
    return (
      <Popup>
          <h1>{content.title}</h1>
          <div>{content.description}</div>
      </Popup>
    )
  }

  editControl() {
    if(this.state.editable === false) {
      setTimeout(() => {
        if(window.react_map && window.react_map._mapElementsRef) {
          this.setState({
            editable: true
          })
          window.react_map._mapElementsRef.leafletElement._toolbars.edit._modes.edit.handler.disable()
        }
      }, 1000)
    } else {
      setTimeout(() => {
        if(window.react_map && window.react_map._mapElementsRef) {
          this.setState({
            editable: false
          })
          window.react_map._mapElementsRef.leafletElement._toolbars.edit._modes.edit.handler.enable()
        }
      }, 2000)
    }
  }

  removeControl() {
    setTimeout(() => {
      if(window.react_map && window.react_map._mapElementsRef && this.state.removable === false) {
        this.setState({
          removable: true
        })
        window.react_map._mapElementsRef.leafletElement._toolbars.edit._modes.remove.handler.enable()
      } else if(window.react_map && window.react_map._mapElementsRef && window.react_map._mapElementsRef._toolbars){
        this.setState({
          removable: false
        })
        window.react_map._mapElementsRef.leafletElement._toolbars.edit._modes.remove.handler.disable()
      }
    }, 1000)
  }

  render() {
    const { mapElementsControl } = this
    return (
      <div>
        <FeatureGroup onClick={(e) => this.handleElementClick(e)}>
          <EditControl
            onDrawStop={() => console.log('stop')}
            ref={el => mapElementsControl(el)}
            position='topleft'
          />
          { this.getMapElements() }
          { this.state.openPopup &&
            this.popupRender()
          }
        </FeatureGroup>
        <ContextMenu
          contextId={'alta-map'}
          items={[
            {label: 'Edit', onClick: () => this.editControl()},
            {label: 'Delete', onClick: () => this.removeControl()}
          ]}/>
        { this.state.modal &&
          <Modal close={this.openModal} body={this.modalRender()} />
        }
      </div>
    )
  }
}

export default MapElements
