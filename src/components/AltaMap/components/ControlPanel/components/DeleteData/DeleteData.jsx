import React, { Component } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

class DeleteData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOption: null,
    }

    this.confirmDeleteElement = this.confirmDeleteElement.bind(this)
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
  }

  setDeleteOption(mapElements) {
    let options = []
    mapElements.getElements().map((el) => options.push({ value: el.id, label: `[${el.type}]: ${el.id}` }))
    return options
  }

  confirmDeleteElement() {
    const { handlers } = this.props
    handlers.deleteElementById(this.state.selectedOption.value)
    this.setState({
      selectedOption: null,
    })
  }

  render() {
    const { selectedOption } = this.state
    const { mapElements } = this.props
    return (
      <div className='delete__data'>
        <h2>Delete Element</h2>
        <Select
          className='select'
          classNamePrefix='select'
          value={selectedOption}
          onChange={this.handleChange}
          options={this.setDeleteOption(mapElements)}
        />
        { selectedOption && selectedOption.value ?
          <button  className='btn btn--primary' onClick={() => {this.confirmDeleteElement()}}>Submit</button> :
          <button className='btn btn--disabled' disabled>Submit</button>
        }
      </div>
    )
  }
}

DeleteData.propTypes = {
  handlers: PropTypes.object,
  mapElements: PropTypes.object,
}

export default DeleteData
