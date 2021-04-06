import React from 'react'
import jwt_decode from 'jwt-decode'

export default function Message({ message }) {
  const jwt = jwt_decode(localStorage.getItem('jwt'))
  const userID = jwt.userID

  return message.type === 'msg' || message.type === undefined ? (
    <div
      key={message.id}
      className={
        userID === message.author
          ? 'message message-sent'
          : 'message message-received'
      }
      style={{
        alignSelf: userID === message.author ? 'flex-end' : 'flex-start',
      }}>
      <span>{message.message}</span>
    </div>
  ) : (
    <img
      style={{ width: '50vw', height: 'auto' }}
      src={process.env.REACT_APP_IP_PUBLIC + '/images/' + message.filename}
      alt={message.filename}
    />
  )
}
