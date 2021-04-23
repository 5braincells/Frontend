import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default function Profile() {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const remember = JSON.parse(localStorage.getItem('remember'))
  console.log(remember)
  const user = JSON.parse(useSelector(state => state?.jwt?.user))
  const jwt = useSelector(state => state?.jwt?.jwt)
  const jwtDecoded = jwt_decode(jwt)
  const userID = jwtDecoded.userID

  const onSubmit = data => {
    const apidata = { userID, jwt, changes: data }

    axios.post(process.env.REACT_APP_IP + '/changeProfile', apidata)
    dispatch({
      type: 'SIGNING',
      jwt,
      user: data,
      remember,
    })
  }

  return (
    <Container className='page-container'>
      <h1>Change profile</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId='formLastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name='lastName'
            type='text'
            defaultValue={user.lastName}
            placeholder='Last name'
            className='textbox'
            ref={register()}
          />
        </Form.Group>
        <Form.Group controlId='formFirstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name='firstName'
            type='text'
            defaultValue={user.firstName}
            placeholder='First name'
            className='textbox'
            ref={register()}
          />
        </Form.Group>
        <Form.Group controlId='formGrade'>
          <Form.Label>Grade</Form.Label>
          <Form.Control
            name='grade'
            as='select'
            defaultValue={user.grade}
            className='textbox'
            ref={register()}>
            <option value='9'>Clasa a 9-a</option>
            <option value='10'>Clasa a 10-a</option>
            <option value='11'>Clasa a 11-a</option>
            <option value='12'>Clasa a 12-a</option>
          </Form.Control>
        </Form.Group>
        <Button className='button button-green' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  )
}
