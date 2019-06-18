import React from 'react';
import ReactDOM from 'react-dom';
import MapDraw from './MapDraw';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapDraw />, div);
  ReactDOM.unmountComponentAtNode(div);
});
