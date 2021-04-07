import React from 'react'
import jwt_decode from 'jwt-decode'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import ImageModal from './ImageModal'

export default function Message({ message }) {
  const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt')
  const jwtDecoded = jwt_decode(jwt)
  const userID = jwtDecoded.userID
  const [modalShow, setModalShow] = React.useState(false)

  return (
    <div
      key={message.id}
      className={`message ${
        userID === message.author ? 'message-sent' : 'message-received'
      }`}>
      {message.type === 'msg' || message.type === undefined ? (
        <div class='message-text'>{message.message}</div>
      ) : message.type === 'img' ? (
        <>
          <img
            onClick={() => setModalShow(true)}
            className='message-image'
            src={process.env.REACT_APP_IP_PUBLIC + '/files/' + message.filename}
            alt={message.filename}
          />
          <ImageModal
            show={modalShow}
            imgSrc={
              process.env.REACT_APP_IP_PUBLIC + '/files/' + message.filename
            }
            onHide={() => setModalShow(false)}
          />
        </>
      ) : (
        <div class='message-file'>
          <FontAwesomeIcon
            style={{ marginRight: '4px', height: '1.2rem', width: '1.2rem' }}
            color='#fff'
            icon={Icons.faFile}
          />
          <a
            href={
              process.env.REACT_APP_IP_PUBLIC + '/files/' + message.filename
            }
            download={message.filename}
            target='_blank'
            rel='noreferrer'>
            {message.filename}
          </a>
        </div>
      )}
    </div>
  )
}
