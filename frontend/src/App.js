import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import PrivateRoute from './utils/PrivateRoute'

import { AuthProvider } from './context/AuthContext'

import LandingPage from './routes/LandingPage/LandingPage'
import Register from './routes/LandingPage/register'
import Login from './routes/LandingPage/login'
import Dashboard from './routes/Dashboard/Dashboard'
import WatchList from './components/DashCompnenets/WatchList'
import Portfolio from './routes/Dashboard/Portfolio'
import Stock from './routes/Dashboard/Stock'
import Prediction from './routes/Dashboard/Prediction'

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
            <Route exact path='/dashboard/predict/:symbol' element={<Prediction />} />
            <Route exact path='/dashboard/stock/:symbol' element={<Stock />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
