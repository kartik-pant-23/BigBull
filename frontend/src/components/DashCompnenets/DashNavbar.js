import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthContext'
import ApexChart from './graph'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DashNavbar = () => {
  const navigate = useNavigate()
  let { user, userDetail } = useContext(AuthContext)
  // return <div>hello {userDetail && <p>{userDetail.user.first_name}</p>}</div>

  const resetBalance = async () => {
    let response = await fetch(
      `http://127.0.0.1:3001/api/users/reset_balance/${user.id}/`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    let data = await response.json()
    window.location.reload()
  }
  return (
    <>
      <nav class='navbar navbar-expand-lg navbar-dark'>
        <a
          onClick={() => navigate('/dashboard')}
          class='navbar-brand'
          style={{ color: '#fff' }}
        >
          BigBull
        </a>
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon'></span>
        </button>

        <div class='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul class='navbar-nav ml-auto'>
            <li class='nav-item'>
              <button className='btn btn-block'>
                Available Balance:
                {userDetail && userDetail.user.account_balance}
              </button>
            </li>
            <li class='nav-item dropdown'>
              <a
                class='nav-link dropdown-toggle'
                id='navbarDropdown'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                hello {userDetail && userDetail.user.first_name}
              </a>
              <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
                <a class='dropdown-item' onClick={resetBalance}>
                  Balance Reset
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default DashNavbar
