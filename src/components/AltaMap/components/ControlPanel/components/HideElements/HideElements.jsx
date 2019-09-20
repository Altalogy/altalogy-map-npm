import React, { Component } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

class HideElements extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOption: null,
      hide: false
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
  }

  setHideOption(mapElements) {
    let options = []
    mapElements.getElements().map((el) => options.push({ value: el.id, label: `[${el.type}]: ${el.id}` }))
    return options
  }

  confirmHideElement() {
    const { handlers } = this.props
    handlers.hideElementById(this.state.selectedOption.value)
    this.setState({
      hide: !this.state.hide
    })
  }

  render() {
    const { selectedOption } = this.state
    const { mapElements } = this.props
    return (
      <div className='hide__elements'>
        <h2>Hide Element</h2>
        <Select
          className='select'
          classNamePrefix='select'
          value={selectedOption}
          onChange={this.handleChange}
          options={this.setHideOption(mapElements)}
        />
        { selectedOption && selectedOption.value ?
          <button  className='btn btn--primary' onClick={() => {this.confirmHideElement()}}>Submit</button> :
          <button className='btn btn--disabled' disabled>Submit</button>
        }
      </div>
    )
  }
}

HideElements.propTypes = {
  handlers: PropTypes.object,
  mapElements: PropTypes.object,
}

export default HideElements
