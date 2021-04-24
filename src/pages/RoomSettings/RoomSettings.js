import React, { useEffect, useRef, useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import './RoomSettings.css'
import { Room } from '../../pages'

export default function RoomSettings() {
  const userVideo = useRef()
  const tracks = useRef()
  const [videoDevices, setVideoDevices] = useState([])
  const [audioDevices, setAudioDevices] = useState([])
  const [currDevices, setCurrDevices] = useState({})
  const [disableAudio, setDisableAudio] = useState(false)
  const [disableVideo, setDisableVideo] = useState(false)
  const { register, handleSubmit } = useForm()

  const [isLoading, setIsLoading] = useState(true)
  const [ready, setReady] = useState(false)

  const history = useHistory()

  useEffect(() => {
    async function getMediaDevices() {
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
          <div className='room-settings'>
            <video
              className='video'
              muted
              ref={userVideo}
              autoPlay
              playsInline
            />
            <Form onSubmit={handleSubmit(onSubmit)}>
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
              <Form.Group controlId='formDisableAudio'>
                <Form.Label>Mute microphone</Form.Label>
                <Form.Check
                  name='disableAudio'
                  type='switch'
                  ref={register()}
                />
              </Form.Group>
              <Form.Group controlId='formDisableVideo'>
                <Form.Label>Disable camera</Form.Label>
                <Form.Check
                  name='disableVideo'
                  type='switch'
                  ref={register()}
                />
              </Form.Group>
              <button className='button button-green' type='submit'>
                Save
              </button>
            </Form>
          </div>
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
