import React from 'react'
import './ControlPanel.scss'
import AddData from '../AddData'
import DrawerControl from '../DrawerControl'
import HideElements from '../HideElements'
import DeleteData from '../DeleteData'
import Modal from './components/Modal'

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
    const { altaRef } = this.props
    const elements = altaRef.current.getElements()
    switch(modalContent) {
      case 'add':
        return <Modal close={this.openModal} body={<AddData altaRef={altaRef} />} />;
      case 'hide':
        return <Modal close={this.openModal} body={<HideElements altaRef={altaRef.current} elements={elements} />} />;
      case 'del':
        return <Modal close={this.openModal} body={<DeleteData altaRef={altaRef.current} elements={elements} />} />;
      default:
        return <div></div>
    }
  }

  render () {
    const { enabled, elements, altaRef, } = this.props
    const { change, modal } = this.state
    if (!enabled) { return '' }
    return (
      <div className='control-panel'>
        <button className={(change ? `control-panel__open_btn change` : 'control-panel__open_btn')} onClick={this.controlPanel}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </button>
        { change &&
          <div>
            <h1>Control panel</h1>
            <hr></hr>
            <DrawerControl
              altaRef={altaRef}
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
      </div>
    )
  }
}

export default ControlPanel
