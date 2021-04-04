import React from 'react'
import jwt_decode from 'jwt-decode'

export default function Message({ message }) {
  const jwt = jwt_decode(localStorage.getItem('jwt'))
  const userID = jwt.userID

  return (
    <div
      key={message.id}
      className='message'
      style={{
        alignSelf: userID === message.author ? 'flex-end' : 'flex-start',
      }}>
      <span>{message.message}</span>
    </div>
  )
}
