import React, { useContext, useEffect } from 'react'
import DashNavbar from '../../components/DashCompnenets/DashNavbar'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import Portfolio from './Portfolio'
import News from './News'
import WatchList from '../../components/DashCompnenets/WatchList'

const Dashboard = () => {
  return (
    <section className='dashboard'>
      <DashNavbar />
      <div className='dashborad-components'>
        <div className='watchlist'>
          <WatchList />
        </div>
        <div className='portfolio'>
          <Portfolio />
        </div>
        <div className='news'>
          <News />
        </div>
      </div>
    </section>
  )
}

export default Dashboard
