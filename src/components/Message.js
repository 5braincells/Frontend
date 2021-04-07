import React from 'react'
import jwt_decode from 'jwt-decode'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function Message({ message }) {
  const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt')
  const jwtDecoded = jwt_decode(jwt)
  const userID = jwtDecoded.userID

  return (
    <div
      key={message.id}
      className={`message ${
        userID === message.author ? 'message-sent' : 'message-received'
      }`}>
      {message.type === 'msg' || message.type === undefined ? (
        <div class="message-text">{message.message}</div>
      ) : message.type === 'img' ? (
        <img
          className='message-image'
          src={process.env.REACT_APP_IP_PUBLIC + '/files/' + message.filename}
          alt={message.filename}
        />
      ) : (
        <div class="message-file">
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
