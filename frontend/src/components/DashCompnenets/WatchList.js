import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import Loading from '../Loading'
import SingleWatchlist from './SingleWatchlist'
import TextField from '@mui/material/TextField'
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete'
import { useNavigate } from 'react-router-dom'
import icon from '../../images/favicon.ico'

function SuggestionList({ data }) {
  const navigate = useNavigate()
  return (
    <ul className='dropdown-menu drop'>
      {data &&
        data.map((company) => (
          <li
            onClick={() => navigate(`stock/${company.symbol}`)}
            className='dropdown-item'
            key={company.symbol}
          >
            {company.company_name}
            <br />({company.symbol})<div class='dropdown-divider'></div>
          </li>
        ))}
    </ul>
  )
}
const WatchList = () => {
  let [watchlist, setWatchlist] = useState([])
  let { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [company, setCompany] = useState([])
  const searchValue = React.useRef('')
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    setLoading(true)
    let response = fetch(
      `http://127.0.0.1:3001/api/users/watchlist/${user.id}/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(async (res) => {
        let data = await res.json()
        setWatchlist(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])
  function searchCompany() {
    setSearchTerm(searchValue.current.value)
    let response = fetch(
      `http://127.0.0.1:3001/api/stocks/search/?q=${searchTerm.toUpperCase()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(async (res) => {
        let data = await res.json()
        setCompany(data.companies)
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      <div className='input-group'>
        <div class='input-group-prepend'>
          <button
            type='button'
            class='btn btn-outline-secondary dropdown-toggle dropdown-toggle-split display-none'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <span class='sr-only'>Toggle Dropdown</span>
          </button>
          <SuggestionList data={company} />
        </div>
        <input
          ref={searchValue}
          onChange={searchCompany}
          type='text'
          class='form-control dropdown-toggle dropdown-toggle-split search-company'
          aria-label='Text input with segmented dropdown button'
          data-toggle='dropdown'
          placeholder='Search Company Here....'
        />
      </div>
      <h1 className='portfolio-heading'>Watchlist</h1>
      {loading ? (
        <Loading />
      ) : watchlist.length === 0 ? (
        <h3 className='watchlist-error'>
          Nothing in your watchlist !! <br /> <br />{' '}
          <img style={{ width: '10%' }} src={icon} />
        </h3>
      ) : (
        <div className='list-watchlist'>
          {watchlist &&
            watchlist.map((item) => {
              return (
                <div className='list-group'>
                  <SingleWatchlist key={item.symbol} data={item} />
                </div>
              )
            })}
        </div>
      )}
    </>
  )
}

export default WatchList
