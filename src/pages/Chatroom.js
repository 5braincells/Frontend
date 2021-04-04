import React, { useEffect, useState } from 'react'
import { FormControl, InputGroup, Button } from 'react-bootstrap'
import { useParams } from 'react-router'

import axios from 'axios'
import jwt_decode from 'jwt-decode'

import '../styles/Chatroom.css'
import ChatroomHeader from '../components/ChatroomHeader'
import Message from '../components/Message'

const ip = process.env.REACT_APP_IP

export default function Chatroom() {
  const { category } = useParams()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  const chatroom = {
    id: 1,
    picture:
      'data:image/png;base64,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',
    name: 'Chatroom 1',
  }

  const apidata = { category: category }
  useEffect(() => {
    axios
      .post(ip + '/getMessages', apidata)
      .then(response => {
        if (response.status === 200) {
          setMessages(response.data)
        }
      })
      .catch(e => console.log(e))
  }, [])

  const jwt = jwt_decode(localStorage.getItem('jwt'))
  const userID = jwt.userID

  const sendMessage = event => {
    const apidata2 = {
      messageData: {
        message: message,
        category: category,
      },
      userID: userID,
      jwt: localStorage.getItem('jwt'),
    }

    axios.post(ip + '/sendMessage', apidata2).then(response => {
      if (response.status === 200) {
        setMessages([...messages, response.data.messageData])
      }
    })

    setMessage('')
  }

  const messageList = messages.map(message => <Message message={message} />)

  return (
    <div className='chat-container'>
      <div className='chatroom-container'>
        <ChatroomHeader chatroom={chatroom} />
        <div className='message-list'>{messageList}</div>
        <InputGroup>
          <FormControl
            placeholder='Send a message'
            aria-label='message'
            value={message}
            onChange={data => setMessage(data.target.value)}
          />
          <InputGroup.Append>
            <Button variant='secondary' onClick={sendMessage}>
              Send
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    </div>
  )
}
