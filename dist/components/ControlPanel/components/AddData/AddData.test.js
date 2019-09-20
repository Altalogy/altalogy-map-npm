import React from 'react';
import ReactDOM from 'react-dom';
import AddData from './AddData';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(React.createElement(AddData, null), div);
  ReactDOM.unmountComponentAtNode(div);
});