import React from 'react';
import ReactDOM from 'react-dom';
import MapElements from './MapElements';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapElements />, div);
  ReactDOM.unmountComponentAtNode(div);
});
