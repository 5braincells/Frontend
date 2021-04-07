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
      }`}
      style={{
        alignSelf: userID === message.author ? 'flex-end' : 'flex-start',
      }}>
      {message.type === 'msg' || message.type === undefined ? (
        <span>{message.message}</span>
      ) : message.type === 'img' ? (
        <img
          className='w-100'
          src={process.env.REACT_APP_IP_PUBLIC + '/files/' + message.filename}
          alt={message.filename}
        />
      ) : (
        <>
          <FontAwesomeIcon
            style={{ paddingRight: '2px', height: '1.2rem', width: '1.2rem' }}
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
        </>
      )}
    </div>
  )
}
