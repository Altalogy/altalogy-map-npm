import React, { Component } from 'react';
import Select from 'react-select';

class HideElements extends Component {
  constructor(props) {
    super(props);

    this.handleChange = selectedOption => {
      this.setState({
        selectedOption
      });
    };

    this.state = {
      selectedOption: null,
      hide: false,
      options: []
    };
  }

  componentDidMount() {
    if (this.props.elements) {
      this.setHideOption(this.props.elements);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.elements) {
      this.setHideOption(nextProps.elements);
    }
  }

  setHideOption(elements) {
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

  confirmHideElement() {
    this.props.altaRef.hideElementById(this.state.selectedOption.value);
    this.setState({
      hide: !this.state.hide
    });
  }

  render() {
    const {
      selectedOption,
      options
    } = this.state;
    return React.createElement("div", {
      className: "hide__elements"
    }, React.createElement("h2", null, "Hide Element"), React.createElement(Select, {
      className: "select",
      classNamePrefix: "select",
      value: selectedOption,
      onChange: this.handleChange,
      options: options
    }), selectedOption && selectedOption.value ? React.createElement("button", {
      className: "btn btn--primary",
      onClick: () => {
        this.confirmHideElement();
      }
    }, "Submit") : React.createElement("button", {
      className: "btn btn--disabled",
      disabled: true
    }, "Submit"));
  }

}

export default HideElements;