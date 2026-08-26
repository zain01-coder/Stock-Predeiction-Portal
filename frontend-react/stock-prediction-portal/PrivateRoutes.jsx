import {Children, useContext} from 'react'
import { AuthContext } from './src/context/AuthProvider'
import { Navigate } from 'react-router-dom'


const PrivateRoutes = ({children}) => {
    const {isLoggedin} = useContext(AuthContext)
  return isLoggedin ? (
    children
  ) : (
    <Navigate to='/login'/>
  )
}

export default PrivateRoutes
