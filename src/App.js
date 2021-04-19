import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import {
  Chatroom,
  Categories,
  Error,
  Home,
  Landing,
  LogIn,
  Register,
  Room,
} from './pages'

export default function App() {

  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  })

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={LogIn} />

        <PrivateRoute exact path='/home' component={Home} />
        <PrivateRoute exact path='/categories' component={Categories} />
        <PrivateRoute exact path='/categories/:category' component={Chatroom} />
        <PrivateRoute exact path='/room/:roomID' component={Room} />
        <Route path='' component={Error} />
      </Switch>
    </Router>
  )
}
