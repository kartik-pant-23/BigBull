import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingUpper = () => {
  const navigate = useNavigate()
  return (
    <section className='landingUpper'>
      <nav class='navbar navbar-expand-lg navbar-dark'>
        <a class='navbar-brand'>BigBull</a>
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon'></span>
        </button>

        <div class='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul class='navbar-nav ml-auto'>
            <li class='nav-item active'>
              <a class='nav-link' href='#'>
                Home <span class='sr-only'>(current)</span>
              </a>
            </li>
            <li class='nav-item'>
              <a class='nav-link'>Features</a>
            </li>
            <li class='nav-item'>
              <a class='nav-link'>About Us</a>
            </li>
            <li class='nav-item'>
              <a class='nav-link' onClick={() => navigate('login')}>
                Sign In
              </a>
            </li>
            <li class='nav-item'>
              <button
                class='btn btn-danger'
                onClick={() => navigate('register')}
              >
                Free Sign Up
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className='landingUpper-title'>
        <div className='left-title'>
          <h1>BigBull</h1>
          <h2>Let's make a difference</h2>
          <p>
            "It's not whether you're right or wrong that's important, but how
            much money you make when you're right and how much you lose when
            you're wrong."
            <br /> — George Soros
          </p>
          <p>
            "Don't look for the needle in the haystack. Just buy the haystack!"
            <br />— John Bogle
          </p>
          <button
            class='btn btn-lg btn-danger'
            onClick={() => navigate('register')}
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}

export default LandingUpper
