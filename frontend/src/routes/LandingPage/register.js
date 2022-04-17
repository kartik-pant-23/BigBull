import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const Register = () => {
  let { registerUser } = useContext(AuthContext)

  return (
    <form onSubmit={registerUser}>
      {/* <input type='text' name='firstName' placeholder='First Name' />
        <input type='name' name='lastName' placeholder='Last Name' />
        <input type='email' name='email' placeholder='Enter email' />
        <input type='password' name='password' placeholder='enter password' />
        <button type='submit'>Register</button> */}

      <div class='form-outline mb-4 first'>
        <input
          type='text'
          name='firstName'
          id='form1Example1'
          class='form-control'
          placeholder='First Name'
        />
      </div>
      <div class='form-outline mb-4'>
        <input
          type='text'
          name='lastName'
          id='form1Example2'
          class='form-control'
          placeholder='Last Name'
        />
      </div>
      <div class='form-outline mb-4'>
        <input
          type='email'
          name='email'
          id='form1Example3'
          class='form-control'
          placeholder='Enter Email'
        />
      </div>

      <div class='form-outline mb-4'>
        <input
          type='password'
          name='password'
          id='form1Example4'
          class='form-control'
          placeholder='Password'
        />
      </div>
      <button type='submit' class='register-button btn btn-danger btn-block'>
        Register
      </button>
    </form>
  )
}

export default Register
