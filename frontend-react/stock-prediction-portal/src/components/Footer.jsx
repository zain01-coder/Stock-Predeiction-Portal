import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container site-footer-container">
        <div className="site-footer-brand">
          <a className="site-footer-logo" href="#top" aria-label="StockPredict home">
            Stock<span>Predict</span>
          </a>
          <p className="site-footer-description">
            Smarter market insights, powered by machine learning.
          </p>
        </div>
      </div>

      <div className="container site-footer-bottom">
        <p>© 2026 StockPredict. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
