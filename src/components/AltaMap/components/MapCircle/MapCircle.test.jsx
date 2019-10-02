import React from 'react';
import ReactDOM from 'react-dom';
import MapCircle from './MapCircle';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapCircle />, div);
  ReactDOM.unmountComponentAtNode(div);
});
