import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
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
        <Modal.Header style={{ backgroundColor: '#343a40' }}>
          <Modal.Title>Create a custom studyroom</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: '#343a40' }}>
          <Form.Group controlId='formStudyroomName'>
            <Form.Label>Studyroom Name</Form.Label>
            <Form.Control
              name='studyroomName'
              type='text'
              placeholder='Enter studyroom name'
              ref={register({ required: true, validate: hasSpaces })}
            />
            {errors.studyroomName &&
              errors.studyroomName.type === 'required' && (
                <Form.Text className='form-error'>This is required</Form.Text>
              )}
            {errors.studyroomName &&
              errors.studyroomName.type === 'validate' && (
                <Form.Text className='form-error'>
                  Numele nu trebuie să conțină spații
                </Form.Text>
              )}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: '#343a40' }}>
          <Button variant='secondary' onClick={handleclosebutton}>
            Close
          </Button>
          <Button variant='primary' type='submit'>
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
