import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

import ImageModal from './ImageModal'

export default function Message({ message }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const jwt = useSelector(state => state?.jwt?.jwt)
  const jwtDecoded = jwt_decode(jwt)
  const userID = jwtDecoded.userID
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_IP + '/profile/' + message.author)
      .then(response => {
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const msgDate = new Date(message.time)
  const thisDate = new Date()

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const dateString =
    (!(msgDate.getDate() === thisDate.getDate())
      ? days[msgDate.getDay()] + ' '
      : '') + (msgDate.getHours() < 10 ? '0' : '') +
    msgDate.getHours() +
    ':' + (msgDate.getMinutes() < 10 ? '0' : '') +
    msgDate.getMinutes()

  return (
    <div
      key={message.id}
      className={`message ${
        userID === message.author ? 'message-sent' : 'message-received'
      }`}
      tabIndex='-1'>
      <div className='message-info'>
        {userID === message.author ? 
          <button 
            className='blank-button message-button'
            title='Delete Message'
          >
            <FontAwesomeIcon
              color='#f00'
              icon={Icons.faTrash}
            />
          </button> : '' 
        }
        <span className='message-username'>{firstName + ' ' + lastName}</span>
        <span className='message-date'>{dateString}</span>
      </div>
      {message.type === 'msg' || message.type === undefined ? (
        <div className='message-text'>{message.message}</div>
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
