import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router'

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

export default function Room({ devices, disableaudio, disablevideo }) {
  const history = useHistory()
  const { roomID } = useParams()
  const [peers, setPeers] = useState([])
  const peersRef = useRef([])
  const userVideo = useRef()
  const tracks = useRef()
  const socketRef = useRef()

  const [muted, setMuted] = useState(disableaudio)
  const [video, setVideo] = useState(disablevideo)

  useEffect(() => {
    const constraints = {
      video: {
        deviceId: devices.video,
      },
      audio: {
        deviceId: devices.audio,
      },
    }
    socketRef.current = io.connect(process.env.REACT_APP_IP_PUBLIC)
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      tracks.current = stream.getTracks()
      userVideo.current.srcObject = stream
      if (muted) {
        handleMute()
        setMuted(true)
      }
      if (video) {
        handleVideo()
        setVideo(true)
      }
      socketRef.current.emit('join room', roomID)
      socketRef.current.on('all users', users => {
        const peers = []
        users.forEach(userID => {
          const peer = createPeer(userID, socketRef.current.id, stream)
          peersRef.current.push({
            peerID: userID,
            peer,
          })
          peers.push({
            peerID: userID,
            peer,
          })
        })
        setPeers(peers)
      })
      socketRef.current.on('user joined', payload => {
        const peer = addPeer(
          payload.signal,
          payload.callerID,
          userVideo.current.srcObject
        )
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        })

        const peerObj = {
          peer,
          peerID: payload.callerID,
        }

        setPeers(users => [...users, peerObj])
      })
      socketRef.current.on('receiving returned signal', payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id)
        item.peer.signal(payload.signal)
      })
      socketRef.current.on('user left', id => {
        const peerObj = peersRef.current.find(p => p.peerID === id)
        if (peerObj) {
          peerObj.peer.destroy()
        }
        const peers = peersRef.current.filter(p => p.peerID !== id)
        let uniquePeers = peers.filter((peer, index) => {
          return peers.indexOf(peer) === index
        })
        peersRef.current = [...uniquePeers]
        setPeers(uniquePeers)
      })
    })
    return () => {
      socketRef.current.disconnect()
      socketRef.current = null
      peersRef.current.forEach(peer => peer.peer.destroy())
      peers.forEach(peer => peer.peer.destroy())
      tracks.current.forEach(track => {
        track.stop()
      })
    }
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
    event?.preventDefault()
    userVideo.current.srcObject
      .getAudioTracks()
      .forEach(track => (track.enabled = !track.enabled))
    setMuted(!muted)
    tracks.current = userVideo.current.srcObject.getTracks()
  }

  const handleVideo = event => {
    event?.preventDefault()
    userVideo.current.srcObject.getTracks().forEach(track => {
      if (track.kind !== 'audio') track.enabled = !track.enabled
    })
    setVideo(!video)
    tracks.current = userVideo.current.srcObject.getTracks()
  }

  const handleLeave = event => {
    event.preventDefault()
    history.replace(`/categories/${roomID}`)
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
        {peersRef.current.map(peer => {
          return <Video key={peer.peerID} peer={peer.peer} />
        })}
      </div>
      <div className='room-buttons'>
        <button
          className={`button ${
            muted ? 'button-red' : 'button-green'
          } button-round-large mr-1 ml-1`}
          type='submit'
          title={muted ? 'Enable Voice' : 'Disable Voice'}
          onClick={handleMute}>
          <FontAwesomeIcon
            color='#fff'
            icon={muted ? Icons.faMicrophoneSlash : Icons.faMicrophone}
            size='lg'
          />
        </button>
        <button
          className={`button ${
            video ? 'button-red' : 'button-green'
          } button-round-large mr-1 ml-1`}
          type='submit'
          title={video ? 'Enable Video' : 'Disable Video'}
          onClick={handleVideo}>
          <FontAwesomeIcon
            color='#fff'
            icon={video ? Icons.faVideoSlash : Icons.faVideo}
            size='lg'
          />
        </button>
        <button
          className='button button-red button-round-large mr-1 ml-1'
          type='submit'
          title='Leave Call'
          onClick={handleLeave}>
          <FontAwesomeIcon color='#fff' icon={Icons.faPhoneSlash} size='lg' />
        </button>
      </div>
    </div>
  )
}
