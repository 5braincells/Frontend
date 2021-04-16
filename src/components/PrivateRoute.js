import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ children, ...rest }) {
  const user = useSelector(state => state?.jwt?.user)

  return (
    <Route {...rest}>
      {user ? children : <Redirect to={{ pathname: '/login' }} />}
    </Route>
  )
}
