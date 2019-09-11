import React from 'react'

class ControlPanel extends React.Component {
  render () {
    const { enabled, elements, toggleControlPanel } = this.props
    if (!enabled) { return '' }
    return (
      <div className='control-panel'>
        <button className='control-panel__open_btn' onClick={toggleControlPanel}>
          Open Panel
        </button>
        <h1>Control panel</h1>
      </div>
    )
  }
}

export default ControlPanel
