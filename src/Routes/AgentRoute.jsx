import { Navigate } from 'react-router-dom'
import useRole from '../Pages/Hooks/useRole'
import PropTypes from 'prop-types'


const AgentRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <span className="loading loading-bars loading-lg"></span>
  if (role === 'agent') return children
  return <Navigate to='/dashboard' />
}

export default AgentRoute

AgentRoute.propTypes = {
  children: PropTypes.element,
}