import React from 'react'

const Card = ({title , text , time}) => {
  return (
    <div className='Card'>
        <h2>{title}</h2>
        <p>{text}</p>
        <time>{time}</time>
    </div>
  )
}

export default Card;