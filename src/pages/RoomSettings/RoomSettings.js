import React, { useEffect, useRef, useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import './RoomSettings.css'
import { Room } from '../../pages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function RoomSettings() {
  const userVideo = useRef()
  const tracks = useRef()
  const [videoDevices, setVideoDevices] = useState([])
  const [audioDevices, setAudioDevices] = useState([])
  const [currDevices, setCurrDevices] = useState({})
  const [disableAudio, setDisableAudio] = useState(false)
  const [disableVideo, setDisableVideo] = useState(false)
  const { register, handleSubmit } = useForm()
  const [settingsCollapsed, setSettingsCollapsed] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const [ready, setReady] = useState(false)

  const history = useHistory()

  useEffect(() => {
    async function getMediaDevices() {
      console.log(navigator)
      await navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(stream => {
          stream.getTracks().forEach(track => track.stop())
        })
        .catch(e => {
          if (e.message === 'Permission denied') {
            // handle error
            history.replace('/error')
            return
          }
        })
      const devices = await navigator.mediaDevices.enumerateDevices()
      if (devices[0].deviceId === '') {
      }
      setVideoDevices([
        ...devices.filter(device => device.kind === 'videoinput'),
      ])
      setAudioDevices([
        ...devices.filter(device => device.kind === 'audioinput'),
      ])
      const constraints = {
        video: { deviceId: videoDevices[0]?.deviceId },
        audio: { deviceId: audioDevices[0]?.deviceId },
      }
      setCurrDevices({
        video: videoDevices[0]?.deviceId,
        audio: audioDevices[0]?.deviceId,
      })
      await navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          setIsLoading(false)
          tracks.current = stream.getTracks()
          userVideo.current.srcObject = stream
        })
        .catch(e => {
          console.log(e)
        })
    }
    getMediaDevices()
    return () => {
      tracks.current?.forEach(track => {
        track.stop()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changePreview = (newDeviceLabel, newDeviceType) => {
    if (newDeviceType === 'video') {
      const newVideoDevice = videoDevices.find(
        device => device.label === newDeviceLabel
      ).deviceId
      const constraints = {
        video: {
          deviceId: newVideoDevice,
        },
        audio: { deviceId: currDevices.audio },
      }
      setCurrDevices({
        ...currDevices,
        video: newVideoDevice,
      })
      tracks.current.forEach(track => {
        track.stop()
      })
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        tracks.current = stream.getTracks()
        userVideo.current.srcObject = stream
      })
    } else if (newDeviceType === 'audio') {
      const newAudioDevice = audioDevices.find(
        device => device.label === newDeviceLabel
      ).deviceId
      const constraints = {
        video: { deviceId: currDevices.video },
        audio: {
          deviceId: newAudioDevice,
        },
      }
      setCurrDevices({
        ...currDevices,
        audio: newAudioDevice,
      })
      tracks.current.forEach(track => {
        track.stop()
      })
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        tracks.current = stream.getTracks()
        userVideo.current.srcObject = stream
      })
    }
  }

  const onSubmit = data => {
    setCurrDevices({
      video: videoDevices.find(device => device.label === data.video).deviceId,
      audio: audioDevices.find(device => device.label === data.audio).deviceId,
    })
    setDisableAudio(data.disableAudio)
    setDisableVideo(data.disableVideo)
    setReady(true)
  }

  if (!ready)
    return (
      <div className='room-settings-container'>
        {!isLoading ? (
          <Form className='room-settings' onSubmit={handleSubmit(onSubmit)}>
            <div className='video-container'>
              <video
                className='video'
                muted
                ref={userVideo}
                autoPlay
                playsInline
              />
            </div>
            <div className='control-buttons'>
              <button
                className={`button ${
                  disableAudio ? 'button-red' : 'button-green'
                } button-round mr-1 ml-1`}
                type='button'
                title={disableAudio ? 'Enable Voice' : 'Disable Voice'}
                onClick={() => setDisableAudio(!disableAudio)}>
                <FontAwesomeIcon
                  color='#fff'
                  icon={
                    disableAudio ? Icons.faMicrophoneSlash : Icons.faMicrophone
                  }
                  size='lg'
                />
              </button>
              <Form.Check
                name='disableAudio'
                type='checkbox'
                style={{ display: 'none' }}
                checked={disableAudio}
                ref={register()}
              />
              <button
                className='button button-green join-button ml-1 mr-1'
                type='submit'>
                Join Room
              </button>
              <button
                className={`button ${
                  disableVideo ? 'button-red' : 'button-green'
                } button-round mr-1 ml-1`}
                type='button'
                title={disableVideo ? 'Enable Video' : 'Disable Video'}
                onClick={() => setDisableVideo(!disableVideo)}>
                <FontAwesomeIcon
                  color='#fff'
                  icon={disableVideo ? Icons.faVideoSlash : Icons.faVideo}
                  size='lg'
                />
              </button>
              <Form.Check
                name='disableVideo'
                type='checkbox'
                style={{ display: 'none' }}
                checked={disableVideo}
                ref={register()}
              />
            </div>
            <div className='text-center'>
              <button
                className='button'
                type='button'
                onClick={() => setSettingsCollapsed(!settingsCollapsed)}>
                Settings
                <FontAwesomeIcon
                  color='#fff'
                  className='ml-2'
                  icon={settingsCollapsed ? Icons.faAngleUp : Icons.faAngleDown}
                  size='md'
                />
              </button>
            </div>
            <div className={`settings-collapse ${settingsCollapsed && 'show'}`}>
              <h3>Video</h3>
              <Form.Group controlId='formVideoDevice'>
                <Form.Control
                  name='video'
                  as='select'
                  custom
                  className='textbox'
                  onChange={event => changePreview(event.target.value, 'video')}
                  ref={register({ required: true })}>
                  {videoDevices.map(device => (
                    <option key={device.deviceId}>{device.label}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <h3>Audio</h3>
              <Form.Group controlId='formAudioDevice'>
                <Form.Control
                  name='audio'
                  as='select'
                  custom
                  className='textbox'
                  onChange={event => changePreview(event.target.value, 'audio')}
                  ref={register({ required: true })}>
                  {audioDevices.map(device => (
                    <option key={device.deviceId}>{device.label}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
          </Form>
        ) : (
          <div className='loading-box'>
            <Spinner animation='border' />
          </div>
        )}
      </div>
    )
  else
    return (
      <Room
        devices={currDevices}
        disableaudio={disableAudio}
        disablevideo={disableVideo}
      />
    )
}
