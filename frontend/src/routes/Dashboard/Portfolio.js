import React, { useContext, useEffect, useState } from 'react'
import DashNavbar from '../../components/DashCompnenets/DashNavbar'
import SinglePortfolio from '../../components/DashCompnenets/SinglePortfolio'
import AuthContext from '../../context/AuthContext'
import favicon1 from '../../images/favicon1.ico'

const Portfolio = () => {
  let { portfolio } = useContext(AuthContext)
  return (
    <>
      <h1 className='portfolio-heading'>Portfolio</h1>
      {portfolio && portfolio.length > 0 ? (
        <div className='single-portfolio'>
          {portfolio &&
            portfolio.map((stock) => {
              return (
                <SinglePortfolio
                  key={stock.id}
                  symbol={stock.symbol}
                  company_name={stock.company_name}
                  quantity={stock.quantity}
                  avg_value={stock.avg_value.toFixed(2)}
                />
              )
            })}
        </div>
      ) : (
        <h3 className='watchlist-error'>
          Portfolio is empty !! <br /> <br />
          <img style={{ width: '10%' }} src={favicon1} />
        </h3>
      )}
    </>
  )
}

export default Portfolio
