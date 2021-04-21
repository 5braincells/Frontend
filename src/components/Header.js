import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Header() {
  const dispatch = useDispatch()
  const jwt = useSelector(state => state?.jwt?.jwt)

  const logOut = e => {
    const remember = JSON.parse(localStorage.getItem('remember'))
    dispatch({ type: 'UNSIGNING', remember: remember })
  }

  return (
    <Navbar bg='dark' variant='dark' expand='sm' fixed='top'>
      <Navbar.Brand>
        <Link to='/'>Studyrooms</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          {jwt ? (
            <Link to='/categories' className='header-link'>
              Categories
            </Link>
          ) : (
            <></>
          )}
        </Nav>
        <Nav>
          {jwt ? (
            <Link to='/' onClick={logOut} className='header-link'>
              Log Out
            </Link>
          ) : (
            <>
              <Link to='/register' className='header-link'>
                Register
              </Link>
              <Link to='/login' className='header-link'>
                Log In
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
