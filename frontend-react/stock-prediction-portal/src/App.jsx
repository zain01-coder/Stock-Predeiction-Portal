import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Register from './pages/Register'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
