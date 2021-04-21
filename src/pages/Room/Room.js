import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router'

import io from 'socket.io-client'
import Peer from 'simple-peer'

import './Room.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import SettingsModal from '../../components/SettingsModal'

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
  height: window.innerHeight,
  width: window.innerWidth,
}

const Room = props => {
  const [peers, setPeers] = useState([])
  const [muted, setMuted] = useState(false)
  const [video, setVideo] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const socketRef = useRef()
  const userVideo = useRef()
  const peersRef = useRef([])
  const history = useHistory()
  const { roomID } = useParams()

  useEffect(() => {
    let tracks
    socketRef.current = io.connect(process.env.REACT_APP_IP_PUBLIC)
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then(stream => {
        tracks = stream.getTracks()
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
            peers.push({
              peerID: userID,
              peer,
            })
          })
          setPeers(peers)
        })

        socketRef.current.on('user joined', payload => {
          const peer = addPeer(payload.signal, payload.callerID, stream)
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
      tracks.forEach(track => {
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
  }

  const handleVideo = event => {
    event?.preventDefault()
    userVideo.current.srcObject.getTracks().forEach(track => {
      if (track.kind !== 'audio') track.enabled = !track.enabled
    })
    setVideo(!video)
  }

  const handleLeave = event => {
    event.preventDefault()
    history.goBack()
  }

  const changeDevices = devices => {
    var mediaParams = {
      audio: { deviceId: devices.input.deviceId },
      video: { deviceId: devices.video.deviceId },
    }

    navigator.mediaDevices
      .getUserMedia(mediaParams)
      .then(stream => {
        userVideo.current.srcObject = stream

        if (video)
          userVideo.current.srcObject.getTracks().forEach(track => {
            if (track.kind !== 'audio') track.enabled = !track.enabled
          })
        if (muted)
          userVideo.current.srcObject
            .getAudioTracks()
            .forEach(track => (track.enabled = !track.enabled))
      })
      .catch(e => {
        if (e.message === 'Could not start video source')
          alert(
            'Make sure the devices you picked are not used by any other software.'
          )
      })
  }

  return (
    <div className='room-container'>
      <SettingsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleclosebutton={() => setModalShow(false)}
        changedevices={changeDevices}
      />
      <div className='video-grid'>
        <video
          className='video-item'
          muted
          ref={userVideo}
          autoPlay
          playsInline
        />
        {peers.map(peer => {
          return <Video key={peer.peerID} peer={peer.peer} />
        })}
      </div>
      <div className='room-buttons'>
        <button
          className={`button ${muted ? 'button-red' : 'button-green'} button-round-large mr-1 ml-1`}
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
          className={`button ${video ? 'button-red' : 'button-green'} button-round-large mr-1 ml-1`}
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
          <FontAwesomeIcon
            color='#fff'
            icon={Icons.faPhoneSlash}
            size='lg'
          />
        </button>
        <button
          className='button button-round-large mr-1 ml-1'
          type='submit'
          title='Call Settings'
          onClick={e => {
            e.preventDefault()
            setModalShow(true)
          }}>
          <FontAwesomeIcon
            style={{ paddingRight: '2px' }}
            color='#fff'
            icon={Icons.faCog}
            size='lg'
          />
        </button>
      </div>
    </div>
  )
}

export default Room
