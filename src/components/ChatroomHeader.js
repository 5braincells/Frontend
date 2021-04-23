import React from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function Chatroom({ chatroom }) {
  const history = useHistory()

  const user = JSON.parse(useSelector(state => state?.jwt?.user))

  const handleClick = event => {
    event.preventDefault()
    history.push('/categories')
  }

  const createCall = event => {
    event.preventDefault()
    history.push(`/room/${chatroom.id + user.grade}`)
  }

  return (
    <div className='chatroom-header'>
      <button
        style={{
          margin: '0px 12px 0px 0px',
        }}
        className='header-link'
        onClick={handleClick}
        title='Go Back'>
        <FontAwesomeIcon color='#fff' icon={Icons.faArrowLeft} size='lg' />
      </button>
      <img
        src={chatroom.picture}
        alt=''
        width='40'
        height='40'
        style={{ borderRadius: '100px' }}
      />
      <span className='chatroom-header-title'>{chatroom.name}</span>
      <button
        style={{
          margin: '0px',
        }}
        className='header-link mr-3 ml-auto'
        onClick={createCall}
        title='Start Video Call'>
        <FontAwesomeIcon color='#fff' icon={Icons.faVideo} size='lg' />
      </button>
    </div>
  )
}
