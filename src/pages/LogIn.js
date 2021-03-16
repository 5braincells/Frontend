import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
// import axios from 'axios'

export default function Register() {
  const { register, handleSubmit, errors } = useForm()
  const [remember, setRemember] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleChange = () => setRemember(!remember)

  const onSubmit = data => {
    // send data to server

    const res = { user: {}, token: '' }
    dispatch({ type: 'SIGNING', jwt: res, remember })

    history.push('/home')
  }

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
            <Form.Text className='form-error'>This is required</Form.Text>
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
            <Form.Text className='form-error'>This is required</Form.Text>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Check
            type='checkbox'
            label='Remember me'
            onChange={handleChange}
          />
        </Form.Group>
        <Button block variant='primary' type='submit'>
          Log In
        </Button>
      </Form>
      <br />
      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </Container>
  )
}
