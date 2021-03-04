import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'

export default function Landing() {
  return (
    <Container className='container'>
      <h1>Welcome to the Landing page!</h1>
      <Row>
        <Col>
          <Button variant='primary' href='/login'>
            Log In
          </Button>
        </Col>
        <Col>
          <Button variant='primary' href='/register'>
            Register
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
