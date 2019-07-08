import React from 'react';
import ReactDOM from 'react-dom';
import AddData from './AddData';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddData />, div);
  ReactDOM.unmountComponentAtNode(div);
});
