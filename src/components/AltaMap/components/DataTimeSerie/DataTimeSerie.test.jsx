import React from 'react';
import ReactDOM from 'react-dom';
import DataTimeSerie from './DataTimeSerie';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DataTimeSerie />, div);
  ReactDOM.unmountComponentAtNode(div);
});
