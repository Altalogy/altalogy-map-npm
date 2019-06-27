import React from 'react';
import ReactDOM from 'react-dom';
import MapDrawer from './MapDrawer';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(React.createElement(MapDrawer, null), div);
  ReactDOM.unmountComponentAtNode(div);
});