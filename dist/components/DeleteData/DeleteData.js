import React, { Component } from 'react';
import Select from 'react-select';

class DeleteData extends Component {
  constructor(props) {
    super(props);

    this.handleChange = selectedOption => {
      this.setState({
        selectedOption
      });
    };

    this.state = {
      selectedOption: null,
      options: []
    };
  }

  componentDidMount() {
    if (this.props.elements) {
      this.setDeleteOption(this.props.elements);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.elements) {
      this.setDeleteOption(nextProps.elements);
    }
  }

  setDeleteOption(elements) {
    let options = [];
    elements.map(element => {
      options.push({
        value: element.id,
        label: element.id
      });
      return options;
    });
    this.setState({
      options: options
    });
  }

  confirmDeleteElement() {
    const {
      selectedOption,
      options
    } = this.state;
    this.props.altaRef.deleteElementById(selectedOption.value);
    let newOptions = options;
    let index = newOptions.indexOf(selectedOption.value);
    newOptions.splice(index, 1);
    this.setState({
      selectedOption: null,
      options: newOptions
    });
  }

  render() {
    const {
      options,
      selectedOption
    } = this.state;
    return React.createElement("div", {
      className: "delete__data"
    }, React.createElement("h2", null, "Delete Element"), React.createElement(Select, {
      className: "select",
      classNamePrefix: "select",
      value: selectedOption,
      onChange: this.handleChange,
      options: options
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

export default DeleteData;