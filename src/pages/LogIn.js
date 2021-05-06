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
  const [error, setError] = useState(null)

  const handleChange = () => setRemember(!remember)

  const onSubmit = data => {
    axios
      .post(ip + '/login', { userData: data })
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
          history.push('/categories')
        }
      })
      .catch(e => {
        console.log(e.response)
        setError(e)
      })
  }

  return (
    <Container className='page-container'>
      <h3>Conectează-te pe Studyrooms</h3>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ maxWidth: '200px', margin: '0 auto' }}>
          <Form.Group controlId='formEmail'>
            <Form.Control
              name='email'
              type='email'
              placeholder='Adresă de mail'
              className='textbox'
              ref={register({ required: true })}
            />
            {errors.email && errors.email.type === 'required' && (
              <Form.Text className='form-error'>
                Acest câmp este obligatoriu
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId='formPassword'>
            <Form.Control
              name='password'
              type='password'
              placeholder='Parolă'
              className='textbox'
              ref={register({ required: true })}
            />
            {errors.password && errors.password.type === 'required' && (
              <Form.Text className='form-error'>
                Acest câmp este obligatoriu
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Check
              type='checkbox'
              label='Ține-mă minte'
              onChange={handleChange}
            />
          </Form.Group>
          <Button block className='button button-green' type='submit'>
            Conectează-te
          </Button>
        </div>
        {error && (
          <Form.Text className='form-error text-center'>
            {error.response.data.reason}
          </Form.Text>
        )}
      </Form>
      <br />
      <p>
        Nu ai un cont?{' '}
        <Link to='/register' className='custom-a'>
          Înregistrează-te
        </Link>
      </p>
    </Container>
  )
}
