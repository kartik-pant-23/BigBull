import React, { useContext, useEffect } from 'react'
import DashNavbar from '../../components/DashCompnenets/DashNavbar'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import Portfolio from './Portfolio'
import News from './News'
import WatchList from '../../components/DashCompnenets/WatchList'

const Dashboard = () => {
  return (
    <section>
      <DashNavbar />
      <div className='dashborad-components'>
        <div>
          <WatchList />
        </div>
        <div>
          <Portfolio />
        </div>
        <div>
          <News />
        </div>
      </div>
    </section>
  )
}

export default Dashboard
