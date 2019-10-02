import React from 'react';
import ReactDOM from 'react-dom';
import MapPolyline from './MapPolyline';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapPolyline />, div);
  ReactDOM.unmountComponentAtNode(div);
});
