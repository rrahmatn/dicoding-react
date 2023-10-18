import React from 'react'

const Button = ({onClick , children , color}) => {
  return (
    <button className={`my-button`} style={{backgroundColor : color}} onClick={onClick}>
        {children ? children : "tombol"}
    </button>
  )
}

export default Button