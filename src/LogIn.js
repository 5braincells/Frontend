import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Col, Form, Button, Container } from 'react-bootstrap'
// import axios from 'axios'

export default function Register() {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = data => {
    // send data to server

    history.push('/home')
  }

  const history = useHistory()

  return (
    <Container>
      <h3>Log in to Studyrooms</h3>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId='formEmail'>
          <Form.Control
            name='email'
            type='email'
            placeholder='Email Address'
            ref={register({ required: true })}
          />
          {errors.email && errors.email.type === 'required' && (
            <Form.Text className='formError'>This is required</Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Control
            name='password'
            type='password'
            placeholder='Password'
            ref={register({ required: true })}
          />
          {errors.password && errors.password.type === 'required' && (
            <Form.Text className='formError'>This is required</Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Remember me' />
        </Form.Group>
        <Button block variant='primary' type='submit'>
          Log In
        </Button>
      </Form>
    </Container>
  )
}
