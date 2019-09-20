import React from 'react';
import ReactDOM from 'react-dom';
import DeleteData from './DeleteData';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(React.createElement(DeleteData, null), div);
  ReactDOM.unmountComponentAtNode(div);
});