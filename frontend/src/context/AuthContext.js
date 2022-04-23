import React, { createContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  )
  let [user, setUser] = useState(() =>
    localStorage.getItem('authTokens')
      ? jwt_decode(localStorage.getItem('authTokens'))
      : null
  )

  let [userDetail, setUserDetail] = useState(null)
  let [portfolio, setPortfolio] = useState(null)

  const navigate = useNavigate()

  let registerUser = async (e) => {
    e.preventDefault()
    let response = await fetch('http://127.0.0.1:3001/api/users/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: e.target.firstName.value,
        last_name: e.target.lastName.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
    let data = await response.json()
    if (response.status === 200) {
      navigate('/login')
    } else {
      alert('user already exist!!')
    }
  }
  let loginUser = async (e) => {
    e.preventDefault()
    let response = await fetch('http://127.0.0.1:3001/api/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
    let data = await response.json()

    if (response.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.token))
      localStorage.setItem('authTokens', JSON.stringify(data))
      navigate('/dashboard')
    } else {
      alert('something went wrong')
    }
  }

  let getUserDetail = async () => {
    if (user) {
      let response = await fetch(
        `http://127.0.0.1:3001/api/users/user/${user.id}/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      let data = await response.json()
      if (response.status === 200) {
        setUserDetail(data)
        setPortfolio(data.portfolio)
      } else {
        alert('Something went wrong!!')
      }
    }
  }

  useEffect(
    () => {
      getUserDetail()
    },
    user ? [user.id] : [-1]
  )

  let contextData = {
    user: user,
    registerUser: registerUser,
    loginUser: loginUser,
    userDetail: userDetail,
    portfolio: portfolio,
  }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}
