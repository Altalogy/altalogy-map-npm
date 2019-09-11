import React from 'react';
import ReactDOM from 'react-dom';
import DrawerControl from './DrawerControl';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DrawerControl />, div);
  ReactDOM.unmountComponentAtNode(div);
});
