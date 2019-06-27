import React from 'react';
import ReactDOM from 'react-dom';
import MapLeafletDraw from './MapLeafletDraw';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(React.createElement(MapLeafletDraw, null), div);
  ReactDOM.unmountComponentAtNode(div);
});