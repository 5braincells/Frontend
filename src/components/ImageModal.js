import React from 'react'
import { Modal } from 'react-bootstrap'

export default function ImageModal(props) {
  return (
    <Modal
      {...props}
      dialogClassName='modal-100w modal-100h'
      className='image-modal'
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <img
        style={{ backgroundColor: '#454d5444' }}
        className='modal-image'
        src={props.imgSrc}
        alt=':('
      />
    </Modal>
  )
}
