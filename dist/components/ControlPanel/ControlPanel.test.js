import React from 'react';
import ReactDOM from 'react-dom';
import ControlPanel from './ControlPanel';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(React.createElement(ControlPanel, null), div);
  ReactDOM.unmountComponentAtNode(div);
});