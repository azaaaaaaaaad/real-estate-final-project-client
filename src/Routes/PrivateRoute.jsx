import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
// import LoadingSpinner from '../components/Shared/LoadingSpinner'
import { useContext } from 'react'
import { AuthContext } from '../Providers/AuthProvider'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) return <span className="loading loading-bars loading-lg"></span>
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
}

export default PrivateRoute