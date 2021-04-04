import React from 'react'

export default function Chatroom({ chatroom }) {
  return (
    <div className='chatroom-header'>
      <img
        src={chatroom.picture}
        alt=''
        width='40'
        height='40'
        style={{ borderRadius: '100px' }}
      />
      <span className='chatroom-header-title'>{chatroom.name}</span>
    </div>
  )
}
