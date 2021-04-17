import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ children, ...rest }) {
  const jwt = useSelector(state => state?.jwt?.jwt)

  return (
    <Route {...rest}>
      {jwt ? children : <Redirect to={{ pathname: '/login' }} />}
    </Route>
  )
}
