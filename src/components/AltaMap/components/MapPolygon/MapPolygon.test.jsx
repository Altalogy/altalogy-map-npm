import React from 'react';
import ReactDOM from 'react-dom';
import MapPolygon from './MapPolygon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapPolygon />, div);
  ReactDOM.unmountComponentAtNode(div);
});
