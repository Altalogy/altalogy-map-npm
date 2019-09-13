import React from 'react';
import ReactDOM from 'react-dom';
import AddressSearchBar from './AddressSearchBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddressSearchBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
