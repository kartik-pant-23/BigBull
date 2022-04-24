import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const SinglePortfolio = ({ symbol, company_name, quantity, avg_value }) => {
  const navigate = useNavigate()
  return (
    <div
      className='card card-portfolio'
      onClick={() => navigate(`/dashboard/stock/${symbol}`)}
    >
      <h5 className='card-header'>{company_name}</h5>
      <div className='card-body'>
        <h5 className='card-title'>{symbol}</h5>
        <p>
          <span style={{ color: 'gray' }}>QUANTITY:</span> {quantity}
        </p>
        <p>
          <span style={{ color: 'gray' }}>AVG VALUE:</span> {avg_value}
        </p>
      </div>
    </div>
  )
}

export default SinglePortfolio
