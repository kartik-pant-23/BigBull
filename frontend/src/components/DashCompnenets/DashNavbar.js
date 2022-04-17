import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import ApexChart from './graph'

const DashNavbar = () => {
  let { user, userDetail } = useContext(AuthContext)
  // return <div>hello {userDetail && <p>{userDetail.user.first_name}</p>}</div>
  return (
    <>
      <nav class='navbar navbar-expand-lg navbar-dark'>
        <a class='navbar-brand' style={{ color: '#fff' }}>
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
            <li class='nav-item active'>
              <a class='nav-link' href='#'>
                Home <span class='sr-only'>(current)</span>
              </a>
            </li>
            <li class='nav-item'>
              <a class='nav-link'>WishList</a>
            </li>
            <li class='nav-item'>
              <a class='nav-link'>Portfolio</a>
            </li>
            <li class='nav-item'>
              <a class='nav-link'>Basket</a>
            </li>
            <li class='nav-item dropdown'>
              <a
                class='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdown'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                hello {userDetail && userDetail.user.first_name}
              </a>
              <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
                <a class='dropdown-item'>Balance Reset</a>
                <a class='dropdown-item'>Logout</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <ApexChart />
    </>
  )
}

export default DashNavbar
