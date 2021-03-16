import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Col, Form, Button, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
// import axios from 'axios'

export default function Register() {
  const [password, setPassword] = useState('')
  const [type, setType] = useState('password')
  const { register, handleSubmit, errors } = useForm()
  const history = useHistory()
  const dispatch = useDispatch()

  const onSubmit = data => {
    // send data to server

    const res = { user: {}, token: '' }
    dispatch({ type: 'SIGNING', jwt: res })

    history.push('/home')
  }

  const arePasswordsTheSame = value => {
    return password === value
  }

  const showHide = e => {
    setType(type === 'password' ? 'text' : 'password')
  }

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
              <Form.Text className='form-error'>This is required</Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} controlId='formLastName'>
            <Form.Control
              name='lastName'
              placeholder='Last name'
              ref={register({ required: true })}
            />
            {errors.lastName && errors.lastName.type === 'required' && (
              <Form.Text className='form-error'>This is required</Form.Text>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={12} sm={6} controlId='formClass'>
            <Form.Control name='class' as='select'>
              <option value='0'>Clasa...</option>
              <option value='9'>Clasa a 9-a</option>
              <option value='10'>Clasa a 10-a</option>
              <option value='11'>Clasa a 11-a</option>
              <option value='12'>Clasa a 12-a</option>
            </Form.Control>
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
            <Form.Text className='form-error'>This is required</Form.Text>
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
              <Form.Text className='form-error'>This is required</Form.Text>
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
              <Form.Text className='form-error'>This is required</Form.Text>
            )}
            {errors.password2 && errors.password2.type === 'validate' && (
              <Form.Text className='form-error'>
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
