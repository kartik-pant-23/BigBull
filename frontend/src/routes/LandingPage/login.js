import React, { useContext } from 'react'
import DashNavbar from '../../components/DashCompnenets/DashNavbar'
import AuthContext from '../../context/AuthContext'

const Login = () => {
  let { loginUser } = useContext(AuthContext)
  return (
    <div className='reglogform'>
      <form onSubmit={loginUser}>
        {/* <input type='email' name='email' placeholder='enter email' />
        <input type='password' name='password' placeholder='enter password' />
        <input type='submit' /> */}
        <div class='form-outline mb-4 first'>
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
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
