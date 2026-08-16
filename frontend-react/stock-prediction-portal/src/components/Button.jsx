import React from 'react'
import './Button.css'

const Button = ({ text, variant = 'primary'}) => {
  return (
    <a className={`btn site-button site-button-${variant}`}>
      {text}
    </a>
  )
}

export default Button
