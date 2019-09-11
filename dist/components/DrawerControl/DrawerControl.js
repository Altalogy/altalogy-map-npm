import React from 'react';
import './DrawerControl.scss';

const DrawerControl = props => {
  return React.createElement("div", {
    className: "drawer__control"
  }, React.createElement("button", {
    onClick: () => props.altaRef.current.drawRef.current.setMapDrawer('polyline')
  }, "Draw Polyline"), React.createElement("button", {
    onClick: () => props.altaRef.current.drawRef.current.setMapDrawer('polygon')
  }, "Draw Polygon"), React.createElement("button", {
    onClick: () => props.altaRef.current.drawRef.current.setMapDrawer('rectangle')
  }, "Draw Rectangle"), React.createElement("button", {
    onClick: () => props.altaRef.current.drawRef.current.setMapDrawer('circle')
  }, "Draw Circle"), React.createElement("button", {
    onClick: () => props.altaRef.current.drawRef.current.editMapDrawer()
  }, "Edit"), React.createElement("button", {
    onClick: () => props.altaRef.current.drawRef.current.removeMapDrawer()
  }, "Remove"));
};

export default DrawerControl;