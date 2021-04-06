import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router'

export default function Chatroom({ chatroom }) {
  const history = useHistory()

  const handleClick = event => {
    event.preventDefault()
    history.goBack()
  }

  return (
    <div className='chatroom-header'>
      <button style={{ all: 'unset', cursor: 'pointer' }} onClick={handleClick}>
        <FontAwesomeIcon
          className='mr-3 ml-1'
          color='#fff'
          icon={Icons.faArrowLeft}
          size='lg'
        />
      </button>
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
