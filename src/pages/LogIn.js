import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Container } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import axios from 'axios'

const ip = process.env.REACT_APP_IP

export default function Register() {
  const { register, handleSubmit, errors } = useForm()
  const [remember, setRemember] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleChange = () => setRemember(!remember)

  const onSubmit = data => {
    const apidata = { userData: data }

    axios
      .post(ip + '/login', apidata)
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('remember', remember)
          dispatch({
            type: 'SIGNING',
            jwt: response.data.jwt,
            user: {
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              grade: response.data.grade,
            },
            remember: remember,
          })
          history.push('/home')
        }
      })
      .catch(e => console.log(e))
  }

  return (
    <Container className='page-container'>
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
        Don't have an account?{' '}
        <Link to='/register' className='custom-a'>
          Register
        </Link>
      </p>
    </Container>
  )
}
