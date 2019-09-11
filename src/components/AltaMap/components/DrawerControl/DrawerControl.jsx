import React from 'react'
import './DrawerControl.scss'

const DrawerControl = (props) => {
  return (
    <div className='drawer__control'>
      <button onClick={() => props.altaRef.current.drawRef.current.setMapDrawer('polyline')}>Draw Polyline</button>
      <button onClick={() => props.altaRef.current.drawRef.current.setMapDrawer('polygon')}>Draw Polygon</button>
      <button onClick={() => props.altaRef.current.drawRef.current.setMapDrawer('rectangle')}>Draw Rectangle</button>
      <button onClick={() => props.altaRef.current.drawRef.current.setMapDrawer('circle')}>Draw Circle</button>
      <button onClick={() => props.altaRef.current.drawRef.current.editMapDrawer()}>Edit</button>
      <button onClick={() => props.altaRef.current.drawRef.current.removeMapDrawer()}>Remove</button>
    </div>
  )
}

export default DrawerControl
