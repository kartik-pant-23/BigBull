import React, { useContext } from 'react'
import DashNavbar from '../../components/DashCompnenets/DashNavbar'
import AuthContext from '../../context/AuthContext'

const Dashboard = () => {
  return (
    <>
      <DashNavbar />
      <div>You are now logged in!!</div>
    </>
  )
}

export default Dashboard
