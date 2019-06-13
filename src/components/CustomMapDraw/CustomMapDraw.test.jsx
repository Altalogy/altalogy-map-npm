import React from 'react';
import ReactDOM from 'react-dom';
import CustomMapDraw from './CustomMapDraw';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomMapDraw />, div);
  ReactDOM.unmountComponentAtNode(div);
});
