import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

export default function Error() {
  const jwt = useSelector(state => state?.jwt?.jwt)
  const history = useHistory()

  const gotoCategories = e => {
    history.push('/categories')
  }

  const gotoLanding = e => {
    history.push('/')
  }

  const gotoLogIn = e => {
    history.push('/login')
  }

  return (
    <Container className='page-container'>
      <h1 style={{ fontSize: '64pt', fontWeight: '100' }}>404</h1>
      <h1>Page not found</h1>
      <h2 className='mt-4 mb-3' style={{ fontSize: '20pt' }}>
        You might want to go elsewhere.
      </h2>
      {jwt ? (
        <button
          className='button button-green'
          style={{ fontSize: '20pt', fontWeight: '200' }}
          onClick={gotoCategories}>
          Categories
        </button>
      ) : (
        <div>
          <button
            className='button button-green'
            style={{ fontSize: '20pt', fontWeight: '200' }}
            onClick={gotoLanding}>
            Home
          </button>
          <button
            className='button button-green ml-3'
            style={{ fontSize: '20pt', fontWeight: '200' }}
            onClick={gotoLogIn}>
            Log In
          </button>
        </div>
      )}
    </Container>
  )
}
