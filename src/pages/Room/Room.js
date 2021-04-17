import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Button } from 'react-bootstrap'

import io from 'socket.io-client'
import Peer from 'simple-peer'

import './Room.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

const Video = props => {
  const ref = useRef()

  useEffect(() => {
    props.peer.on('stream', stream => {
      ref.current.srcObject = stream
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <video className='video-item' playsInline autoPlay ref={ref} />
}

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
}

const Room = props => {
  const [peers, setPeers] = useState([])
  const [muted, setMuted] = useState(false)
  const socketRef = useRef()
  const userVideo = useRef()
  const peersRef = useRef([])
  const history = useHistory()
  const { roomID } = useParams()

  useEffect(() => {
    socketRef.current = io.connect(process.env.REACT_APP_IP_PUBLIC)
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then(stream => {
        userVideo.current.srcObject = stream
        socketRef.current.emit('join room', roomID)
        socketRef.current.on('all users', users => {
          const peers = []
          users.forEach(userID => {
            const peer = createPeer(userID, socketRef.current.id, stream)
            peersRef.current.push({
              peerID: userID,
              peer,
            })
            peers.push(peer)
          })
          setPeers(peers)
        })

        socketRef.current.on('user joined', payload => {
          const peer = addPeer(payload.signal, payload.callerID, stream)
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          })

          setPeers(users => [...users, peer])
        })

        socketRef.current.on('receiving returned signal', payload => {
          const item = peersRef.current.find(p => p.peerID === payload.id)
          item.peer.signal(payload.signal)
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    })

    peer.on('signal', signal => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      })
    })

    return peer
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on('signal', signal => {
      socketRef.current.emit('returning signal', { signal, callerID })
    })

    peer.signal(incomingSignal)

    return peer
  }

  const handleMute = event => {
    event.preventDefault()
    setMuted(!muted)
  }

  const handleLeave = event => {
    event.preventDefault()
    history.goBack()
  }

  return (
    <div className='room-container'>
      <div className='video-grid'>
        <video
          className='video-item'
          muted
          ref={userVideo}
          autoPlay
          playsInline
        />
        {peers.map((peer, index) => {
          return <Video key={index} peer={peer} />
        })}
      </div>
      <div className='room-buttons'>
        <Button
          className='button mr-1 ml-1'
          type='submit'
          variant='light'
          onClick={handleMute}>
          <FontAwesomeIcon
            style={{ paddingRight: '2px' }}
            color='#fff'
            icon={muted ? Icons.faMicrophoneSlash : Icons.faMicrophone}
            size='lg'
          />
        </Button>
        <Button
          className='button mr-1 ml-1'
          type='submit'
          variant='light'
          onClick={handleLeave}>
          <FontAwesomeIcon
            style={{ paddingRight: '2px' }}
            color='#fff'
            icon={Icons.faPhoneSlash}
            size='lg'
          />
        </Button>
      </div>
    </div>
  )
}

export default Room
