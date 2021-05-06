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
      <Navbar.Brand style={{ padding: '3px 0px 7px 0px', marginRight: '10px' }}>
        <Link to='/'>Studyrooms</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          {jwt && (
            <Link to='/categories' className='header-link'>
              Categorii
            </Link>
          )}
        </Nav>
        <Nav>
          {jwt ? (
            <>
              <Link to='/profile' className='header-link'>
                Profil
              </Link>
              <Link to='/' onClick={logOut} className='header-link'>
                Deloghează-te
              </Link>
            </>
          ) : (
            <>
              <Link to='/register' className='header-link'>
                Înregistrează-te
              </Link>
              <Link to='/login' className='header-link'>
                Conectează-te
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
