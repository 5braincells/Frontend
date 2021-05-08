import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Col, Form, Button, Container, Modal } from 'react-bootstrap'
import axios from 'axios'

const ip = process.env.REACT_APP_IP

export default function Register() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('password')
  const history = useHistory()

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = data => {
    const apidata = { userData: data }

    axios
      .post(ip + '/register', apidata)
      .then(response => {
        if (response.status === 200) {
          setTitle(response.data.response)
          setModalShow(!modalShow)
        }
      })
      .catch(e => {
        console.log(e.response)
        setError(e)
      })
  }

  const arePasswordsTheSame = value => {
    return password === value
  }

  const showHide = e => {
    setType(type === 'password' ? 'text' : 'password')
  }

  return (
    <Container className='page-container'>
      <Modal show={modalShow} centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            className='button'
            onClick={e => {
              e.preventDefault()
              setModalShow(false)
              history.push('/login')
            }}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <h3>Creează-ți contul tău pe Studyrooms</h3>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group as={Col} xs={12} sm={6} controlId='formFirstName'>
            <Form.Control
              name='firstName'
              placeholder='Prenume'
              className='textbox'
              ref={register({ required: true })}
            />
            {errors.firstName && errors.firstName.type === 'required' && (
              <Form.Text className='form-error'>
                Acest câmp este obligatoriu
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} controlId='formLastName'>
            <Form.Control
              name='lastName'
              placeholder='Nume'
              className='textbox'
              ref={register({ required: true })}
            />
            {errors.lastName && errors.lastName.type === 'required' && (
              <Form.Text className='form-error'>
                Acest câmp este obligatoriu
              </Form.Text>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={12} sm={6} controlId='formGrade'>
            <Form.Control
              name='grade'
              as='select'
              className='textbox'
              ref={register({ required: true })}>
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
        <Form.Row>
          <Form.Group as={Col} xs={12} sm={6} controlId='formPassword'>
            <Form.Control
              name='password'
              type={type}
              placeholder='Parolă'
              className='textbox'
              ref={register({ required: true })}
              onChange={event => setPassword(event.target.value)}
            />
            {errors.password && errors.password.type === 'required' && (
              <Form.Text className='form-error'>
                Acest câmp este obligatoriu
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} controlId='formPassword2'>
            <Form.Control
              name='password2'
              type={type}
              placeholder='Confirmă parola'
              className='textbox'
              ref={register({ required: true, validate: arePasswordsTheSame })}
            />
            {errors.password2 && errors.password2.type === 'required' && (
              <Form.Text className='form-error'>
                Acest câmp este obligatoriu
              </Form.Text>
            )}
            {errors.password2 && errors.password2.type === 'validate' && (
              <Form.Text className='form-error'>
                Parolele trebuie să fie identice
              </Form.Text>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Group controlId='formBasicCheckbox'>
          <Form.Check
            type='checkbox'
            label={'Afișează parola'}
            onClick={showHide}
          />
        </Form.Group>
        <Button block className='button button-green' type='submit'>
          Înregistrează-te
        </Button>
        {error && (
          <Form.Text className='form-error text-center'>
            {error.response.data.reason}
          </Form.Text>
        )}
      </Form>
      <br />
      <p>
        Ai deja un cont?{' '}
        <Link to='/login' className='custom-a'>
          Conectează-te
        </Link>
      </p>
    </Container>
  )
}
