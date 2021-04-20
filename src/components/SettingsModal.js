import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

export default function SettingsModal({
  show,
  onHide,
  handleclosebutton,
  changedevices,
}) {
  const [videoDevices, setVideoDevices] = useState([])
  const [audioDevices, setAudioDevices] = useState([])
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    async function getMediaDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices()
      setVideoDevices([
        ...devices.filter(device => device.kind === 'videoinput'),
      ])
      setAudioDevices([
        ...devices.filter(device => device.kind === 'audioinput'),
      ])
    }
    getMediaDevices()
  }, [])

  const videoDevicesList = videoDevices.map(device => (
    <option key={device.deviceId}>{device.label}</option>
  ))
  const audioDevicesList = audioDevices.map(device => (
    <option key={device.deviceId}>{device.label}</option>
  ))

  const onSubmit = data => {
    const devices = {
      video: videoDevices.find(device => device.label === data.video),
      input: audioDevices.find(device => device.label === data.audio),
    }
    changedevices(devices)
    handleclosebutton()
  }

  return (
    <Modal show={show} onHide={() => onHide}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>Call Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>Video</h3>
          <Form.Group controlId='formVideoDevice'>
            <Form.Control
              name='video'
              as='select'
              custom
              className='textbox'
              ref={register({ required: true })}>
              {videoDevicesList}
            </Form.Control>
          </Form.Group>
          <h3>Audio</h3>
          <Form.Group controlId='formAudioDevice'>
            <Form.Control
              name='audio'
              as='select'
              custom
              className='textbox'
              ref={register({ required: true })}>
              {audioDevicesList}
            </Form.Control>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <button className='button' type='reset' onClick={handleclosebutton}>
            Close
          </button>
          <button className='button button-green' type='submit'>
            Save
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
