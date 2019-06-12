import React from 'react';
import ReactDOM from 'react-dom';
import MapMarker from './MapMarker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapMarker />, div);
  ReactDOM.unmountComponentAtNode(div);
});
