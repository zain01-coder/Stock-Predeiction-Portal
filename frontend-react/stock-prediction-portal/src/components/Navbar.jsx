import React from 'react'
import './Navbar.css'
import Button from './Button'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md site-navbar" aria-label="Main navigation">
      <div className="container site-navbar-container">
        <a className="navbar-brand site-navbar-logo" href="#top" aria-label="StockPredict home">
          <svg
            aria-hidden="true"
            className="site-navbar-logo-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m4 16 5-5 4 4 7-8" />
            <path d="M15 7h5v5" />
          </svg>
          <span>Stock<span className="site-navbar-logo-accent">Predict</span></span>
        </a>

        <button
          className="navbar-toggler site-navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#siteNavigation"
          aria-controls="siteNavigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="siteNavigation">
            <div className="site-navbar-actions ms-auto">
              <Button text='Login' variant="outline" />
              <Button text='Get Started'/>
            </div>
          </div>
      </div>
    </nav>
  )
}

export default Navbar
