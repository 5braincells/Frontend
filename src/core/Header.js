import React from 'react'
import { Button, Navbar, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

export default function Header() {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state?.jwt?.user)
  console.log(user)

  const logOut = e => {
    dispatch({ type: 'UNSIGNING' })
    history.push('/')
  }

  return (
    <Navbar bg='dark' variant='dark' expand='sm' fixed='top'>
      <Navbar.Brand>
        <Link to='/'>Studyrooms</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Link to='/home'>Home</Link>
        </Nav>
        <Nav>
          {user ? (
            <Button variant='dark' onClick={logOut}>
              Log Out
            </Button>
          ) : (
            <>
              <Link to='/register' style={{ margin: '0 10px' }}>
                Register
              </Link>
              <Link to='/login' style={{ margin: '0 10px' }}>
                Log In
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
