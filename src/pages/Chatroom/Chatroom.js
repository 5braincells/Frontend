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
import CategoriesList from '../../components/CategoriesList'

const ip = process.env.REACT_APP_IP
const serverlessIP = process.env.REACT_APP_KEYMANAGERIP
var CryptoJS = require('crypto-js')

let arr = []

export default function Chatroom() {
  const { category } = useParams()
  const chatroom = JSON.parse(localStorage.getItem('category'))
  const jwt = useSelector(state => state?.jwt?.jwt)
  const jwtDecoded = jwt_decode(jwt)
  const userID = jwtDecoded.userID

  const [key, setKey] = useState('')
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    let pusher
    axios
      .post(serverlessIP, { category })
      .then(responsekey => {
        setKey(responsekey.data)
        axios
          .post(ip + '/getMessages', { category })
          .then(response => {
            if (response.status === 200) {
              arr = response.data
              arr.forEach(element => {
                if (responsekey.data && element.type === 'msg') {
                  try {
                    var bytes = CryptoJS.AES.decrypt(
                      element.message,
                      responsekey.data
                    )
                    var originalMessage = bytes.toString(CryptoJS.enc.Utf8)
                    element.message = originalMessage
                  } catch (e) {
                    console.log(e)
                  }
                }
              })
              setMessages(response.data)
            }
          })
          .catch(e => console.log(e))
        pusher = new Pusher(process.env.REACT_APP_KEY, {
          cluster: process.env.REACT_APP_CLUSTER,
        })

        var channel = pusher.subscribe(category)
        channel.bind('message', async function (data) {
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
            try {
              data.message.message = await decryptmessage(
                data.message.message,
                responsekey.data
              )
            } catch (e) {
              console.log(e)
            }
            arr = [data.message, ...arr]
            setMessages(arr)
          }
        })
      })
      .catch(e => console.log(e))

    return () => {
      pusher.unsubscribe(category)
    }
  }, [category])

  async function decryptmessage(message, decryptkey) {
    var bytes = await CryptoJS.AES.decrypt(message, decryptkey)
    var originalMessage = await bytes.toString(CryptoJS.enc.Utf8)
    return originalMessage
  }

  const sendMessage = event => {
    if (message) {
      var EncryptedMessage = CryptoJS.AES.encrypt(message, key).toString()

      const apidata2 = {
        messageData: {
          message: EncryptedMessage,
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
      const apidata = {
        category,
        index: arr.length,
      }
      axios
        .post(ip + '/getMessages', apidata)
        .then(response => {
          if (response.status === 200) {
            let tempArr = response.data
            tempArr.forEach(element => {
              if (key) {
                try {
                  var bytes = CryptoJS.AES.decrypt(element.message, key)
                  var originalMessage = bytes.toString(CryptoJS.enc.Utf8)
                  element.message = originalMessage
                } catch (e) {
                  console.log(e)
                }
              }
            })
            arr = [...arr, ...tempArr]
            setMessages(arr)
          }
        })
        .catch(e => console.log(e))
    }
  }

  const messageList = messages.map(message => {
    return <Message message={message} key={message._id} />
  })

  return (
    <div className='chatroom-page'>
      <div className='categories-left'>
        <CategoriesList />
      </div>
      <div className='chatroom-container'>
        <ChatroomHeader chatroom={chatroom} />
        <div onScroll={handleScroll} className='message-list'>
          {messageList}
        </div>
        <Form className='send-box'>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              className='button button-round dropdown-toggle'
              title='Atașamente'>
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
                    className='button button-round'
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
                    className='button button-round'
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
            className='textbox message-input'
            placeholder='Trimite un mesaj'
            aria-label='message'
            value={message}
            onChange={data => setMessage(data.target.value)}
          />
          <Button
            className='button button-green button-round'
            type='submit'
            onClick={sendMessage}>
            <FontAwesomeIcon color='#fff' icon={Icons.faPaperPlane} />
          </Button>
        </Form>
      </div>
    </div>
  )
}
