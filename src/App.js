import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Button, Navbar, Nav } from 'react-bootstrap'

import './index.css'

import Landing from './Landing'
import LogIn from './LogIn'
import Register from './Register'
import Home from './Home'

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <Router>
      <div>
        <Navbar bg='dark' variant='dark' expand='sm' fixed='top'>
          <Navbar.Brand href='/'>Studyrooms</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='/home'>Home</Nav.Link>
            </Nav>
            {/* {user ? (
              <> */}
            <Button href='/register' variant='dark'>
              Register
            </Button>
            <Button href='/login' variant='dark'>
              Log In
            </Button>
            {/* </>
            ) : (
              <Button href='/' variant='dark'>
                Log Out
              </Button>
            )} */}
          </Navbar.Collapse>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path='/login'>
            <LogIn />
          </Route>
          <Route exact path='/home'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
