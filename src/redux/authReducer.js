const authReducer = (
  state = {
    jwt: localStorage.getItem('jwt') || sessionStorage.getItem('jwt'),
    user: localStorage.getItem('user') || sessionStorage.getItem('user'),
  },
  action
) => {
  const { type, jwt, user, remember } = action
  switch (type) {
    case 'SIGNING':
      if (remember) {
        localStorage.setItem('jwt', jwt)
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        sessionStorage.setItem('jwt', jwt)
        sessionStorage.setItem('user', JSON.stringify(user))
      }
      return { jwt: jwt, user: user }
    case 'UNSIGNING':
      if (remember) {
        localStorage.removeItem('jwt', jwt)
        localStorage.removeItem('user', user)
      } else {
        sessionStorage.removeItem('jwt', jwt)
        sessionStorage.removeItem('user', user)
      }
      return null
    default:
      return state
  }
}
export default authReducer
