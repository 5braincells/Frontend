import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Col, Form, Button, Container } from 'react-bootstrap'
import { isElementOfType } from 'react-dom/test-utils'
// import axios from 'axios'

export default function Register() {
  const [password, setPassword] = useState('')
  const [type, setType] = useState('password')
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = data => {
    // send data to server

    history.push('/home')
  }

  const arePasswordsTheSame = value => {
    if (password !== value) return false
    return true
  }

  const showHide = e => {
    setType(type === 'password' ? 'text' : 'password')
  }

  const history = useHistory()

  return (
    <Container className='container'>
      <h3>Create your Studyrooms account</h3>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group as={Col} xs={12} sm={6} controlId='formFirstName'>
            <Form.Control
              name='firstName'
              placeholder='First name'
              ref={register({ required: true })}
            />
            {errors.firstName && errors.firstName.type === 'required' && (
              <Form.Text className='formError'>This is required</Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} controlId='formLastName'>
            <Form.Control
              name='lastName'
              placeholder='Last name'
              ref={register({ required: true })}
            />
            {errors.lastName && errors.lastName.type === 'required' && (
              <Form.Text className='formError'>This is required</Form.Text>
            )}
          </Form.Group>
        </Form.Row>
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
        <Form.Row>
          <Form.Group as={Col} xs={12} sm={6} controlId='formPassword'>
            <Form.Control
              name='password'
              type={type}
              placeholder='Password'
              ref={register({ required: true })}
              onChange={event => setPassword(event.target.value)}
            />
            {errors.password && errors.password.type === 'required' && (
              <Form.Text className='formError'>This is required</Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} controlId='formPassword2'>
            <Form.Control
              name='password2'
              type={type}
              placeholder='Confirm'
              ref={register({ required: true, validate: arePasswordsTheSame })}
            />
            {errors.password2 && errors.password2.type === 'required' && (
              <Form.Text className='formError'>This is required</Form.Text>
            )}
            {errors.password2 && errors.password2.type === 'validate' && (
              <Form.Text className='formError'>
                The passwords must be the same
              </Form.Text>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Group controlId='formBasicCheckbox'>
          <Form.Check
            type='checkbox'
            label={'Show password'}
            onClick={showHide}
          />
        </Form.Group>
        <Button block variant='primary' type='submit'>
          Register
        </Button>
      </Form>
    </Container>
  )
}
