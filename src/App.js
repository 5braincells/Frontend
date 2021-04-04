import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
} from './pages'

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={LogIn} />

          <PrivateRoute exact path='/home' component={Home} />
          <PrivateRoute exact path='/categories' component={Categories} />
          <PrivateRoute
            exact
            path='/categories/:category'
            component={Chatroom}
          />
          <Route path='' component={Error} />
        </Switch>
      </div>
    </Router>
  )
}
