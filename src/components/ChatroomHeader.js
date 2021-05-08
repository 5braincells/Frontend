import React from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function Chatroom({ chatroom }) {
  const history = useHistory()

  const categoryID = [
    'matematica',
    'informatica',
    'biologie',
    'chimie',
    'fizica',
    'economie',
    'geografie',
    'romana',
  ]

  const user = JSON.parse(useSelector(state => state?.jwt?.user))

  const handleClick = event => {
    event.preventDefault()
    history.push('/categories')
  }

  const createCall = event => {
    event.preventDefault()
    history.push(
      `/room/${
        chatroom.id +
        (categoryID.find(id => chatroom.id === id) ? user.grade : '')
      }`
    )
  }

  return (
    <div className='chatroom-header'>
      <button
        style={{
          margin: '0px 12px 0px 0px',
        }}
        className='header-link'
        onClick={handleClick}
        title='Înapoi'>
        <FontAwesomeIcon color='#fff' icon={Icons.faArrowLeft} size='lg' />
      </button>
      <svg style={{ width: '40px', height: '40px' }} viewBox='0 0 24 24'>
        <path fill='currentColor' d={chatroom.picture} />
      </svg>
      <span className='chatroom-header-title'>{chatroom.name}</span>
      <button
        style={{
          margin: '0px',
        }}
        className='header-link mr-3 ml-auto'
        onClick={createCall}
        title='Începe conferință video'>
        <FontAwesomeIcon color='#fff' icon={Icons.faVideo} size='lg' />
      </button>
    </div>
  )
}
