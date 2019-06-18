import React from 'react';
import ReactDOM from 'react-dom';
import CustomMapDraw from './CustomMapDraw';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(React.createElement(CustomMapDraw, null), div);
  ReactDOM.unmountComponentAtNode(div);
});