const authReducer = (state = localStorage.getItem('jwt') || 'null', action) => {
  const { type, jwt, remember } = action
  switch (type) {
    case 'SIGNING':
      if (remember) localStorage.setItem('jwt', jwt)
      return jwt
    case 'UNSIGNING':
      if (remember) localStorage.removeItem('jwt')
      return null
    default:
      return state
  }
}
export default authReducer
