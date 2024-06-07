import { Navigate } from 'react-router-dom'
import useRole from '../Pages/Hooks/useRole'
import PropTypes from 'prop-types'
const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <span className="loading loading-bars loading-lg"></span>
  if (role === 'admin') return children
  return <Navigate to='/dashboard' />
}

export default AdminRoute

AdminRoute.propTypes = {
  children: PropTypes.element,
}