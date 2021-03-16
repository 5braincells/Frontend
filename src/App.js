import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import './index.css'
import Header from './core/Header'
import { Home, Landing, LogIn, Register, Error } from './pages'

export default function App() {
  const user = useSelector(state => state?.jwt?.user)

  return (
    <Router>
      <div>
        <Header />

        <Switch>
          <Route exact path='/' component={Landing} />
          {user ? (
            <Route exact path='/home' component={Home} />
          ) : (
            <>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={LogIn} />
              <Redirect to='/login' />
            </>
          )}
          <Route path='' component={Error} />
        </Switch>
      </div>
    </Router>
  )
}
