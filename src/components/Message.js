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

  const msgDate = new Date(message.time)
  const thisDate = new Date()

  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let dateString;

  dateString = (!(msgDate.getDate() === thisDate.getDate()) ? days[msgDate.getDay()] + ' ' : '') + msgDate.getHours() + ':' + msgDate.getMinutes()


  return (
    <div
      key={message.id}
      className={`message ${
        userID === message.author ? 'message-sent' : 'message-received'
      }`}>
        <div className="message-info">
          <span className="message-username">name</span>
          <span className="message-date">{dateString}</span>
        </div>
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
