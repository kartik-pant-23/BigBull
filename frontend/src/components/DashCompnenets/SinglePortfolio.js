import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const SinglePortfolio = ({ symbol, company_name, quantity, avg_value }) => {
  const navigate = useNavigate()
  return (
    <div
      className='card'
      onClick={() => navigate(`/dashboard/stock/${symbol}`)}
    >
      <p>{symbol}</p>
      <p>q : {quantity}</p>
      <p>price : {avg_value}</p>
      <p>............</p>
    </div>
  )
}

export default SinglePortfolio
