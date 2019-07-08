import React, { Component } from 'react'
import Select from 'react-select'

class DeleteData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOption: null,
      options: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.elements){
      this.setDeleteOption(nextProps.elements)
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
  }

  setDeleteOption(elements) {
    let options = []
    elements.map((element) => {
      options.push({ value: element.id, label: element.id })
      return options
    })
    this.setState({
      options: options
    })
  }

  confirmDeleteElement() {
    const { selectedOption, options } = this.state
    this.props.altaRef.deleteElementById(selectedOption.value)
    let newOptions = options
    let index = newOptions.indexOf(selectedOption.value)
    newOptions.splice(index,1)
    this.setState({
      selectedOption: null,
      options: newOptions
    })
  }

  render() {
    const { options, selectedOption } = this.state
    return (
      <div className='delete__data'>
        <h2>Delete Element</h2>
        <Select
          className='select'
          classNamePrefix='select'
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
        { selectedOption && selectedOption.value ?
          <button  className='btn btn--primary' onClick={() => {this.confirmDeleteElement()}}>Submit</button> :
          <button className='btn btn--disabled' disabled>Submit</button>
        }
      </div>
    )
  }
}

export default DeleteData
