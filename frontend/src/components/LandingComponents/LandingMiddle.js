import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingMiddle = () => {
  const navigate = useNavigate
  return (
    <>
      <div className='landing-middle'>
        <div className='landing-middle-comp'>
          <i class='icon fas fa-check-circle fa-4x'></i>
          <br />
          <br />
          <h3>Easy to use.</h3>
          <p>Extreely easy to use with real time tracking of Profit/Loss</p>
        </div>
        <div className='landing-middle-comp'>
          <i class='fa-solid fa-sack-xmark fa-4x'></i>
          <br /> <br />
          <h3>No Fear of losing Real Money</h3>
          <p>
            Intelligent platform to tell you which equities are performing best.
          </p>
        </div>
        <div className='landing-middle-comp'>
          <i class='fa-solid fa-chart-pie fa-4x'></i>
          <br /> <br />
          <h3>Predict the prices</h3>
          <p>Using modern technologies of ML and AI we predict the price.</p>
        </div>
        <div className='landing-middle-comp'>
          <i class='icon fas fa-solid fa-newspaper fa-4x'></i>
          <br /> <br />
          <h3>Be Updated with the market</h3>
          <p>
            Get news of whats happening in the market, that helps you in
            learning market analysis.
          </p>
        </div>
      </div>
      <div className='about'>
        <div className='about-content'>
          <h2>
            <u>About BigBull</u>
          </h2>
          <br />
          <br />
          <h4>
            In BigBull, we created a website that helps new investors in getting
            started with stock market trading and investing. This will help
            youth in gaining financial literacy and thus becoming financially
            independent.
          </h4>
          <h4>
            Financial Literacy tells us about knowing financial concepts,how
            money works,money management and investing. But today, if we talk
            about the current situation in the field of financial literacy ,it's
            very disappointing. In Fact the numbers are only 33% worldwide.
          </h4>
          <br />
          <br />
          <h5>Now your wait is over</h5>
          <button
            class='btn btn-danger btn-lg'
            onClick={() => navigate('register')}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  )
}

export default LandingMiddle
