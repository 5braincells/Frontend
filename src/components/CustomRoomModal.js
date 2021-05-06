import React from 'react'
import { Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

export default function CustomRoomModal({ show, onHide, handleclosebutton }) {
  const { register, handleSubmit, errors } = useForm()
  const history = useHistory()

  const hasSpaces = studyroomName => {
    return studyroomName.indexOf(' ') === -1
  }

  const onSubmit = data => {
    handleclosebutton()
    const category = {
      id: data.studyroomName,
      picture: 'https://image.flaticon.com/icons/png/512/32/32441.png',
      name: data.studyroomName,
    }

    localStorage.setItem('category', JSON.stringify(category))
    history.push('/categories/' + data.studyroomName)
  }

  return (
    <Modal show={show} onHide={() => onHide}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>Creează un studyroom custom</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId='formStudyroomName'>
            <Form.Label>Numele studyroom-ului</Form.Label>
            <Form.Control
              name='studyroomName'
              type='text'
              placeholder='Numele studyroom-ului'
              className='textbox'
              ref={register({ required: true, validate: hasSpaces })}
            />
            {errors.studyroomName &&
              errors.studyroomName.type === 'required' && (
                <Form.Text className='form-error'>
                  Acest câmp este obligatoriu
                </Form.Text>
              )}
            {errors.studyroomName &&
              errors.studyroomName.type === 'validate' && (
                <Form.Text className='form-error'>
                  Numele nu trebuie să conțină spații
                </Form.Text>
              )}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <button className='button' type='reset' onClick={handleclosebutton}>
            Anulează
          </button>
          <button className='button button-green' type='submit'>
            Alătură-te
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
