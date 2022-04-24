import React from 'react'
import { useNavigate } from 'react-router-dom'

const SingleWatchlist = ({ data }) => {
  const navigate = useNavigate()
  return (
    <a
      onClick={() => navigate(`stock/${data.symbol}`)}
      class='list-group-item list-group-item-action flex-column align-items-start singlewatchlist-a'
    >
      <div class='d-flex w-100 justify-content-between'>
        <h5 class='mb-1'>{data.symbol}</h5>
        <small>{data.current_price}</small>
      </div>
      <p class='mb-1'>{data.company}</p>
    </a>
  )
}

export default SingleWatchlist
