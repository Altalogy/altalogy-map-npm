import React from 'react'
import './Modal.scss'

const Modal = ({header,body,footer,close}) => {
  return (
    <div className='modal__layout'>
      <div className='modal__cmp'>
        <div className='modal__header'>
          <div className='title'>
            {header}
          </div>
          <span className='close' onClick={close}>x</span>
        </div>
        <div className='modal__body'>
          {body}
        </div>
        <div className='modal__footer'>
          {footer}
        </div>
      </div>
    </div>
  )
}

export default Modal
