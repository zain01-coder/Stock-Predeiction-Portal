import React from 'react'
import { Link } from 'react-router-dom'

// Shared look for both variants
const baseStyles =
  'inline-flex min-h-[42px] items-center justify-center rounded-md px-4 py-2 text-[15px] font-semibold transition-colors'

const variantStyles = {
  primary: 'border border-accent bg-accent text-[#08110b] hover:border-accent-dark hover:bg-accent-dark',
  outline: 'border border-border-muted bg-transparent text-primary-text hover:border-gray-600 hover:bg-gray-800',
}

const Button = ({ text, to = '/', variant = 'primary', className = '', onClick }) => {
  return (
    <Link to={to} className={`${baseStyles} ${variantStyles[variant]} ${className}`} onClick={onClick}>
      {text}
    </Link>
  )
}

export default Button
