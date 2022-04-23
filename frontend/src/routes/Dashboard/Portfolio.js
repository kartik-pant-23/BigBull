import React, { useContext, useEffect, useState } from 'react'
import DashNavbar from '../../components/DashCompnenets/DashNavbar'
import SinglePortfolio from '../../components/DashCompnenets/SinglePortfolio'
import AuthContext from '../../context/AuthContext'

const Portfolio = () => {
  let { portfolio } = useContext(AuthContext)
  return (
    <>
      <div>
        {portfolio &&
          portfolio.map((stock) => {
            return (
              <SinglePortfolio
                key={stock.id}
                symbol={stock.symbol}
                company_name={stock.company_name}
                quantity={stock.quantity}
                avg_value={stock.avg_value}
              />
            )
          })}
      </div>
    </>
  )
}

export default Portfolio
