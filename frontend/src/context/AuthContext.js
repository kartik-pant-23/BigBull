import React, { createContext, useState, useEffect } from 'react'
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
  let [userDetail, setUserDetail] = useState(() =>
    localStorage.getItem('userDetail')
      ? JSON.parse(localStorage.getItem('userDetail'))
      : null
  )
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

      axios
        .get(`http://127.0.0.1:3001/api/users/user/${user.id}/`)
        .then((res) => {
          console.log(res.data)
          setUserDetail(res.data)
          localStorage.setItem('userDetail', JSON.stringify(res.data))
        })
        .catch((error) => {
          console.log(error)
        })

      localStorage.setItem('authTokens', JSON.stringify(data))
      navigate('/dashboard')
    } else {
      navigate('/register')
      alert('register first')
    }
  }

  let contextData = {
    user: user,
    registerUser: registerUser,
    loginUser: loginUser,
    userDetail: userDetail,
  }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}
