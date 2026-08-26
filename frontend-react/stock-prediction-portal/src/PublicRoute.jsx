import { useContext } from 'react'
import { AuthContext } from './context/AuthProvider'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
    const { isLoggedin } = useContext(AuthContext)
    return !isLoggedin ? (
        children
    ) : (
        <Navigate to='/dashboard' />
    )
}

export default PublicRoute