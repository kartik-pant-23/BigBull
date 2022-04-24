import React from 'react'

const SingleNews = ({ image, title, description, content, time, mainlink }) => {
  return (
    <div class='col'>
      <div className='card card-news'>
        <img src={image} class='card-img-top' alt='' />
        <div class='card-body'>
          <h5 class='card-title'>{title}</h5>
          <p class='card-text'>{description}</p>
          <p class='card-text'>
            <small class='text-muted'>Published at: {time}</small>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SingleNews
