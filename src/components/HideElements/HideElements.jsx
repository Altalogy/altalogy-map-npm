import React, { Component } from 'react'
import Select from 'react-select'

class HideElements extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOption: null,
      hide: false,
      options: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.elements){
      this.setHideOption(nextProps.elements)
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
  }

  setHideOption(elements) {
    let options = []
    elements.map((element) => {
      options.push({ value: element.id, label: element.id })
      return options
    })
    this.setState({
      options: options
    })
  }

  confirmHideElement() {
    this.props.altaRef.hideElementById(this.state.selectedOption.value)
    this.setState({
      hide: !this.state.hide
    })
  }

  render() {
    const { selectedOption, options } = this.state
    return (
      <div className='hide__elements'>
        <h2>Hide Element</h2>
        <Select
          className='select'
          classNamePrefix='select'
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
        { selectedOption && selectedOption.value ?
          <button  className='btn btn--primary' onClick={() => {this.confirmHideElement()}}>Submit</button> :
          <button className='btn btn--disabled' disabled>Submit</button>
        }
      </div>
    )
  }
}

export default HideElements
