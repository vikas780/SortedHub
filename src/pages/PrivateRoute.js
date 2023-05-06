import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0()
  const isUSer = isAuthenticated && user
  if (!isUSer) {
    return <Navigate to='/login'> </Navigate>
  }
  return children
}
export default PrivateRoute
