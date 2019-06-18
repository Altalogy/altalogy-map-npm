import React from 'react';
import ReactDOM from 'react-dom';
import AltaMap from './AltaMap';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AltaMap />, div);
  ReactDOM.unmountComponentAtNode(div);
});
