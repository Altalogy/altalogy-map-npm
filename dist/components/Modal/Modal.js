import React from 'react';
import './Modal.scss';

const Modal = ({
  header,
  body,
  footer,
  close
}) => {
  return React.createElement("div", {
    className: "modal__layout"
  }, React.createElement("div", {
    className: "modal__cmp"
  }, React.createElement("div", {
    className: "modal__header"
  }, React.createElement("div", {
    className: "title"
  }, header), React.createElement("span", {
    className: "close",
    onClick: close
  }, "x")), React.createElement("div", {
    className: "modal__body"
  }, body), React.createElement("div", {
    className: "modal__footer"
  }, footer)));
};

export default Modal;