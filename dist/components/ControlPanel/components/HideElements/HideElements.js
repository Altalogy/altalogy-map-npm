import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

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
      hide: false
    };
  }

  setHideOption(mapElements) {
    let options = [];
    mapElements.getElements().map(el => options.push({
      value: el.id,
      label: `[${el.type}]: ${el.id}`
    }));
    return options;
  }

  confirmHideElement() {
    const {
      handlers
    } = this.props;
    handlers.hideElementById(this.state.selectedOption.value);
    this.setState({
      hide: !this.state.hide
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
      className: "hide__elements"
    }, React.createElement("h2", null, "Hide Element"), React.createElement(Select, {
      className: "select",
      classNamePrefix: "select",
      value: selectedOption,
      onChange: this.handleChange,
      options: this.setHideOption(mapElements)
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

HideElements.propTypes = {
  handlers: PropTypes.object,
  mapElements: PropTypes.object
};
export default HideElements;