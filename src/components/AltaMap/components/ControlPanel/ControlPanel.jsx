import React from 'react'
import './ControlPanel.scss'
import AddData from './components/AddData'
import DrawerControl from '../DrawerControl'
import HideElements from './components/HideElements'
import DeleteData from './components/DeleteData'
import Modal from '../Modal'
import AddressSearchBar from '../AddressSearchBar'

class ControlPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      change: false,
      modal: false,
      modalContent: '',
    }
    this.openModal = this.openModal.bind(this)
    this.controlPanel = this.controlPanel.bind(this)
  }
  controlPanel() {
    const { toggleControlPanel } = this.props
    this.setState({
      change: !this.state.change,
    })
    toggleControlPanel()
  }

  openModal(content) {
    this.setState({
      modal: !this.state.modal,
      modalContent: content,
    })
  }

  modalRender() {
    const { modalContent } = this.state
    const { handlers, mapElements } = this.props
    switch(modalContent) {
      case 'add':
        return <Modal close={this.openModal} body={<AddData handlers={handlers} />} />;
      case 'hide':
        return <Modal close={this.openModal} body={<HideElements handlers={handlers} mapElements={mapElements} />} />;
      case 'del':
        return <Modal close={this.openModal} body={<DeleteData handlers={handlers} mapElements={mapElements} />} />;
      default:
        return <div></div>
    }
  }

  render () {
    const { controlPanel, mapElements, handlers, searchAddress, googleAPI } = this.props
    const { change, modal } = this.state
    if (!controlPanel || controlPanel.enabled === false) { return '' }
    return (
      <div className='control-panel'>
        <button className={(change ? `control-panel__open_btn change` : 'control-panel__open_btn')} onClick={this.controlPanel}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </button>
        { change &&
          <div>
            { controlPanel && controlPanel.title
              ? <h1>{controlPanel.title}</h1>
              : <h1>Control panel</h1>
            }
            <hr></hr>
            <DrawerControl
              handlers={handlers}
            />
            <hr></hr>
            <div className={(change ? 'elements__control' : 'elements__control hidden')}>
              <button onClick={() => this.openModal('add')}>Add Element</button>
              <button onClick={() => this.openModal('hide')}>Hide Element</button>
              <button onClick={() => this.openModal('del')}>Delete Element</button>
            </div>
          </div>
        }
        { modal &&
          this.modalRender()
        }
        { searchAddress && searchAddress.position === 'controlPanel' &&
          <AddressSearchBar
            searchAddress={searchAddress}
            mapElements={mapElements}
            handlers={handlers}
            googleAPI={googleAPI}
          />
        }
      </div>
    )
  }
}

export default ControlPanel
