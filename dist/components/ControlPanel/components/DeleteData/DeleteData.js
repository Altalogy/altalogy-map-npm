import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class DeleteData extends Component {
  constructor(props) {
    super(props);

    this.handleChange = selectedOption => {
      this.setState({
        selectedOption
      });
    };

    this.state = {
      selectedOption: null
    };
    this.confirmDeleteElement = this.confirmDeleteElement.bind(this);
  }

  setDeleteOption(mapElements) {
    let options = [];
    mapElements.getElements().map(el => options.push({
      value: el.id,
      label: `[${el.type}]: ${el.id}`
    }));
    return options;
  }

  confirmDeleteElement() {
    const {
      handlers
    } = this.props;
    handlers.deleteElementById(this.state.selectedOption.value);
    this.setState({
      selectedOption: null
    });
  }

  render() {
    const {
      selectedOption
    } = this.state;
    const {
      mapElements
    } = this.props;
    return React.createElement("div", {
      className: "delete__data"
    }, React.createElement("h2", null, "Delete Element"), React.createElement(Select, {
      className: "select",
      classNamePrefix: "select",
      value: selectedOption,
      onChange: this.handleChange,
      options: this.setDeleteOption(mapElements)
    }), selectedOption && selectedOption.value ? React.createElement("button", {
      className: "btn btn--primary",
      onClick: () => {
        this.confirmDeleteElement();
      }
    }, "Submit") : React.createElement("button", {
      className: "btn btn--disabled",
      disabled: true
    }, "Submit"));
  }

}

DeleteData.propTypes = {
  handlers: PropTypes.object,
  mapElements: PropTypes.object
};
export default DeleteData;