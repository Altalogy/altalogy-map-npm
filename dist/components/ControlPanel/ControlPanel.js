import React from 'react';
import './ControlPanel.scss';
import AddData from './components/AddData';
import DrawerControl from '../DrawerControl';
import HideElements from './components/HideElements';
import DeleteData from './components/DeleteData';
import Modal from '../Modal';
import AddressSearchBar from '../AddressSearchBar';

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      modal: false,
      modalContent: ''
    };
    this.openModal = this.openModal.bind(this);
    this.controlPanel = this.controlPanel.bind(this);
  }

  controlPanel() {
    const {
      toggleControlPanel
    } = this.props;
    this.setState({
      change: !this.state.change
    });
    toggleControlPanel();
  }

  openModal(content) {
    this.setState({
      modal: !this.state.modal,
      modalContent: content
    });
  }

  modalRender() {
    const {
      modalContent
    } = this.state;
    const {
      handlers,
      mapElements
    } = this.props;

    switch (modalContent) {
      case 'add':
        return React.createElement(Modal, {
          close: this.openModal,
          body: React.createElement(AddData, {
            handlers: handlers
          })
        });

      case 'hide':
        return React.createElement(Modal, {
          close: this.openModal,
          body: React.createElement(HideElements, {
            handlers: handlers,
            mapElements: mapElements
          })
        });

      case 'del':
        return React.createElement(Modal, {
          close: this.openModal,
          body: React.createElement(DeleteData, {
            handlers: handlers,
            mapElements: mapElements
          })
        });

      default:
        return React.createElement("div", null);
    }
  }

  render() {
    const {
      controlPanel,
      mapElements,
      handlers,
      searchAddress,
      googleAPI
    } = this.props;
    const {
      change,
      modal
    } = this.state;

    if (!controlPanel || controlPanel.enabled === false) {
      return '';
    }

    return React.createElement("div", {
      className: "control-panel"
    }, React.createElement("button", {
      className: change ? `control-panel__open_btn change` : 'control-panel__open_btn',
      onClick: this.controlPanel
    }, React.createElement("div", {
      className: "bar1"
    }), React.createElement("div", {
      className: "bar2"
    }), React.createElement("div", {
      className: "bar3"
    })), change && React.createElement("div", null, controlPanel && controlPanel.title ? React.createElement("h1", null, controlPanel.title) : React.createElement("h1", null, "Control panel"), React.createElement("hr", null), React.createElement(DrawerControl, {
      handlers: handlers
    }), React.createElement("hr", null), React.createElement("div", {
      className: change ? 'elements__control' : 'elements__control hidden'
    }, React.createElement("button", {
      onClick: () => this.openModal('add')
    }, "Add Element"), React.createElement("button", {
      onClick: () => this.openModal('hide')
    }, "Hide Element"), React.createElement("button", {
      onClick: () => this.openModal('del')
    }, "Delete Element"))), modal && this.modalRender(), searchAddress && searchAddress.position === 'controlPanel' && React.createElement(AddressSearchBar, {
      searchAddress: searchAddress,
      mapElements: mapElements,
      handlers: handlers,
      googleAPI: googleAPI
    }));
  }

}

export default ControlPanel;