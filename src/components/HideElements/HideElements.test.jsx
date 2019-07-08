import React from 'react';
import ReactDOM from 'react-dom';
import HideElements from './HideElements';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HideElements />, div);
  ReactDOM.unmountComponentAtNode(div);
});
