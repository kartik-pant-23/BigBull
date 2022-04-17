import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import PrivateRoute from './utils/PrivateRoute'

import { AuthProvider } from './context/AuthContext'

import LandingPage from './routes/LandingPage/LandingPage'
import Register from './routes/LandingPage/register'
import Login from './routes/LandingPage/login'
import Dashboard from './routes/Dashboard/Dashboard'

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path='/' element={<LandingPage />} />
            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
