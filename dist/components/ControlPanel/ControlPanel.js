import React from 'react';
import './ControlPanel.scss';
import AddData from '../AddData';
import DrawerControl from '../DrawerControl';
import HideElements from '../HideElements';
import DeleteData from '../DeleteData';
import Modal from './components/Modal';

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
      altaRef
    } = this.props;
    const elements = altaRef.current.getElements();

    switch (modalContent) {
      case 'add':
        return React.createElement(Modal, {
          close: this.openModal,
          body: React.createElement(AddData, {
            altaRef: altaRef
          })
        });

      case 'hide':
        return React.createElement(Modal, {
          close: this.openModal,
          body: React.createElement(HideElements, {
            altaRef: altaRef.current,
            elements: elements
          })
        });

      case 'del':
        return React.createElement(Modal, {
          close: this.openModal,
          body: React.createElement(DeleteData, {
            altaRef: altaRef.current,
            elements: elements
          })
        });

      default:
        return React.createElement("div", null);
    }
  }

  render() {
    const {
      enabled,
      elements,
      altaRef
    } = this.props;
    const {
      change,
      modal
    } = this.state;

    if (!enabled) {
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
    })), change && React.createElement("div", null, React.createElement("h1", null, "Control panel"), React.createElement("hr", null), React.createElement(DrawerControl, {
      altaRef: altaRef
    }), React.createElement("hr", null), React.createElement("div", {
      className: change ? 'elements__control' : 'elements__control hidden'
    }, React.createElement("button", {
      onClick: () => this.openModal('add')
    }, "Add Element"), React.createElement("button", {
      onClick: () => this.openModal('hide')
    }, "Hide Element"), React.createElement("button", {
      onClick: () => this.openModal('del')
    }, "Delete Element"))), modal && this.modalRender());
  }

}

export default ControlPanel;