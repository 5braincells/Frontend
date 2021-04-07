import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ImageModal(props) {
  return (
    <Modal
      {...props}
      dialogClassName='modal-100w modal-100h'
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <img
        style={{ backgroundColor: '#454d54' }}
        className='modal-image'
        src={props.imgSrc}
        alt='aaa'
      />
    </Modal>
  )
}
