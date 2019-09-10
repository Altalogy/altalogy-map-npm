import React from 'react';
import ReactDOM from 'react-dom';
import MapLeafletDrawer from './MapLeafletDrawer';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(React.createElement(MapLeafletDrawer, null), div);
  ReactDOM.unmountComponentAtNode(div);
});