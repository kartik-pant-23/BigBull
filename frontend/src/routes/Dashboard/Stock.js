import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashNavbar from '../../components/DashCompnenets/DashNavbar'
import ApexChart from '../../components/DashCompnenets/graph'

import Loading from '../../components/Loading'
import AuthContext from '../../context/AuthContext'

const Stock = () => {
  const navigate = useNavigate()
  const { symbol } = useParams()
  const [selectedStock, setSelectedStock] = useState([])
  const [ohlc, setOHLC] = useState([])
  const [number, setNumber] = useState(0)
  const [sellnumber, setSellNumber] = useState(0)
  const [loading, setLoading] = useState(true)
  let { user } = useContext(AuthContext)
  useEffect(() => {
    setLoading(true)
    const fetchStocks = async () => {
      try {
        let response = await fetch(
          `http://127.0.0.1:3001/api/stocks/details/${symbol}/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        let data = await response.json()
        setSelectedStock(data)
        console.log(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchStocks()
    const fetchOHLC = async () => {
      try {
        let response = await fetch(
          `http://127.0.0.1:3001/api/stocks/ohlc/${symbol}/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        let data = await response.json()
        let ohlc_data = []
        Object.keys(data).forEach((key) => {
          ohlc_data.push({
            x: new Date(parseInt(key)),
            y: [
              data[key]['Open'].toFixed(2),
              data[key]['High'].toFixed(2),
              data[key]['Low'].toFixed(2),
              data[key]['Close'].toFixed(2),
            ],
          })
        })
        setOHLC(ohlc_data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOHLC()
  }, [])

  const buyStocks = async () => {
    if (number > 0) {
      let price = ''
      let string = selectedStock['Current Price']
      for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) === ',' || string.charAt(i) === '₹') {
          continue
        }
        price += string.charAt(i)
      }
      let body = JSON.stringify({
        symbol: symbol,
        company_name: selectedStock['Company Name'],
        price: parseFloat(price),
        quantity: parseInt(number),
        user_id: parseInt(user.id),
      })
      let response = await fetch('http://127.0.0.1:3001/api/stocks/buy/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      })
      let data = await response.json()
      if (response.status === 200) {
        alert(data.message)
        navigate('/dashboard')
        window.location.reload()
      } else {
        alert('Not enough money!!')
      }
    } else {
      alert('Input valid number of stocks!!')
    }
  }

  const sellStocks = async () => {
    if (sellnumber > 0) {
      let price = ''
      let string = selectedStock['Current Price']
      for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) === ',' || string.charAt(i) === '₹') {
          continue
        }
        price += string.charAt(i)
      }
      let response = await fetch('http://127.0.0.1:3001/api/stocks/sell/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: symbol,
          company_name: selectedStock['Company Name'],
          price: parseFloat(price),
          quantity: parseInt(sellnumber),
          user_id: parseInt(user.id),
        }),
      })
      let data = await response.json()
      if (response.status === 200) {
        alert(data.message)
        navigate('/dashboard')
        window.location.reload()
      }
    } else {
      alert('Input valid number of stocks')
    }
  }

  return (
    <div>
      <DashNavbar />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className='stock-detail'>
            <div className='stock-detail-1'>
              {selectedStock && (
                <div>
                  <h3>{selectedStock['Company Name']}</h3>
                  <h1>{selectedStock['Current Price']}</h1>
                </div>
              )}
              <ApexChart data={ohlc} />
              <button
                type='button'
                data-toggle='modal'
                data-target='#exampleModal'
                className='btn btn-lg btn-danger'
              >
                Buy Stocks
              </button>
              <div
                class='modal fade'
                id='exampleModal'
                tabIndex='-1'
                role='dialog'
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
              >
                <div class='modal-dialog' role='document'>
                  <div class='modal-content'>
                    <div class='modal-header'>
                      <h5 class='modal-title' id='exampleModalLabel'>
                        Modal title
                      </h5>
                      <button
                        type='button'
                        class='close'
                        data-dismiss='modal'
                        aria-label='Close'
                      >
                        <span aria-hidden='true'>&times;</span>
                      </button>
                    </div>
                    <div class='modal-body'>
                      <input
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        type='number'
                        placeholder='number of stocks'
                      />
                    </div>
                    <div class='modal-footer'>
                      <button
                        type='button'
                        class='btn btn-danger'
                        data-dismiss='modal'
                        onClick={buyStocks}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type='button'
                class='btn btn-lg btn-success'
                data-toggle='modal'
                data-target='#exampleModalCenter'
              >
                Sell Stocks
              </button>
              <div
                class='modal fade'
                id='exampleModalCenter'
                tabindex='-1'
                role='dialog'
                aria-labelledby='exampleModalCenterTitle'
                aria-hidden='true'
              >
                <div class='modal-dialog modal-dialog-centered' role='document'>
                  <div class='modal-content'>
                    <div class='modal-header'>
                      <h5 class='modal-title' id='exampleModalLongTitle'>
                        Modal title
                      </h5>
                      <button
                        type='button'
                        class='close'
                        data-dismiss='modal'
                        aria-label='Close'
                      >
                        <span aria-hidden='true'>&times;</span>
                      </button>
                    </div>
                    <div class='modal-body'>
                      <input
                        value={sellnumber}
                        onChange={(e) => setSellNumber(e.target.value)}
                        type='number'
                        placeholder='number of stocks'
                      />
                    </div>
                    <div class='modal-footer'>
                      <button
                        type='button'
                        class='btn btn-success'
                        data-dismiss='modal'
                        onClick={sellStocks}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='stock-detail-2'>
              {selectedStock &&
                Object.keys(selectedStock)
                  .slice(2)
                  .map((key) => {
                    return (
                      <p key={key}>
                        {key} - {selectedStock[key]}
                      </p>
                    )
                  })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Stock
