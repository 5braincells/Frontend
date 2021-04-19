/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, ButtonGroup, Dropdown, Form } from 'react-bootstrap'
import { useParams } from 'react-router'

import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Pusher from 'pusher-js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

import './Chatroom.css'
import ChatroomHeader from '../../components/ChatroomHeader'
import Message from '../../components/Message'
import Categories from '../Categories/Categories'

const ip = process.env.REACT_APP_IP

let arr = []

export default function Chatroom() {
  const { category } = useParams()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  const chatroom = JSON.parse(localStorage.getItem('category'))

  const apidata = { category: category }
  useEffect(() => {
    axios
      .post(ip + '/getMessages', apidata)
      .then(response => {
        if (response.status === 200) {
          setMessages(response.data)
          arr = response.data
        }
      })
      .catch(e => console.log(e))

    const pusher = new Pusher(process.env.REACT_APP_KEY, {
      cluster: process.env.REACT_APP_CLUSTER,
    })

    var channel = pusher.subscribe(category)
    channel.bind('message', function (data) {
      if (data.message.type === 'msgDelete') {
        let arr2 = [...arr]
        const position = arr2.findIndex(
          message => message._id === data.message._id
        )
        if (position > -1) {
          arr2.splice(position, 1)
        }
        arr = [...arr2]
        setMessages(arr)
      } else {
        console.log(data)
        arr = [data.message, ...arr]
        setMessages(arr)
      }
    })

    return () => {
      pusher.unsubscribe(category)
    }
  }, [category])

  const jwt = useSelector(state => state?.jwt?.jwt)
  const jwtDecoded = jwt_decode(jwt)
  const userID = jwtDecoded.userID

  const sendMessage = event => {
    if (message) {
      const apidata2 = {
        messageData: {
          message: message,
          type: 'msg',
          category: category,
        },
        userID: userID,
        jwt: jwt,
      }

      axios.post(ip + '/sendMessage', apidata2)

      setMessage('')
    }
    event.preventDefault()
  }

  const sendImage = event => {
    const formData = new FormData()

    formData.append('image', event.target.files[0])
    formData.append('type', 'img')
    formData.append('category', category)
    formData.append('userID', userID)
    formData.append('jwt', jwt)

    axios.post(process.env.REACT_APP_IP + '/sendPicture', formData)
  }

  const sendFile = event => {
    const formData = new FormData()

    formData.append('file', event.target.files[0])
    formData.append('type', 'file')
    formData.append('category', category)
    formData.append('userID', userID)
    formData.append('jwt', jwt)

    axios.post(process.env.REACT_APP_IP + '/sendFile', formData)
  }

  const handleScroll = event => {
    const target = event.target

    if (target.scrollHeight + target.scrollTop === target.clientHeight) {
      console.log('nice')
    }
  }

  const messageList = messages.map(message => (
    <Message message={message} key={message._id} />
  ))

  return (
    <div className='chatroom-page'>
      <div className='categories-left'>
        <Categories />
      </div>
      <div className='chatroom-container'>
        <ChatroomHeader chatroom={chatroom} />
        <div onScroll={handleScroll} className='message-list'>
          {messageList}
        </div>
        <Form className='send-box'>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              className='button dropdown-toggle'
              title='Attachments'>
              <FontAwesomeIcon
                style={{ paddingRight: '2px' }}
                color='#fff'
                icon={Icons.faPaperclip}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropdown-menu'>
              <div className='dropdown-item'>
                <label
                  style={{ marginBottom: '0px' }}
                  htmlFor='image-upload-button'>
                  <div
                    className='button'
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    variant='light'>
                    <FontAwesomeIcon
                      style={{ paddingRight: '2px' }}
                      color='#fff'
                      icon={Icons.faImage}
                    />
                  </div>
                </label>
                <input
                  type='file'
                  accept='image/*'
                  id='image-upload-button'
                  style={{ display: 'none' }}
                  onChange={sendImage}
                />
              </div>
              <div className='dropdown-item'>
                <label
                  style={{ marginBottom: '0px' }}
                  htmlFor='file-upload-button'>
                  <div
                    className='button'
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    variant='light'>
                    <FontAwesomeIcon
                      style={{ paddingRight: '2px' }}
                      color='#fff'
                      icon={Icons.faFile}
                    />
                  </div>
                </label>
                <input
                  type='file'
                  id='file-upload-button'
                  style={{ display: 'none' }}
                  onChange={sendFile}
                />
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className='message-input'
            placeholder='Send a message'
            aria-label='message'
            value={message}
            onChange={data => setMessage(data.target.value)}
          />
          <Button
            className='button'
            type='submit'
            variant='light'
            onClick={sendMessage}>
            <FontAwesomeIcon color='#fff' icon={Icons.faPaperPlane} />
          </Button>
        </Form>
      </div>
    </div>
  )
}
