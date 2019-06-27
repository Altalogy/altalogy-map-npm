import React from 'react';
import ReactDOM from 'react-dom';
import MapElements from './MapElements';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(React.createElement(MapElements, null), div);
  ReactDOM.unmountComponentAtNode(div);
});