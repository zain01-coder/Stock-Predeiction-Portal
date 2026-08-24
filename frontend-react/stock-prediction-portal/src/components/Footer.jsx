import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-border-muted pt-7 pb-5 text-secondary-text sm:pt-9">
      <div className="mx-auto w-full max-w-[1140px] px-4">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:gap-0">
          <div>
            <Link
              to="/"
              className="text-[1.0625rem] font-bold tracking-tight text-primary-text"
              aria-label="StockPredict home"
            >
              Stock<span className="text-accent">Predict</span>
            </Link>
            <p className="mt-2 text-sm leading-relaxed">
              Smarter market insights, powered by machine learning.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-7 w-full max-w-[1140px] border-t border-border-muted px-4 pt-5">
        <p className="text-[0.8125rem]">© 2026 StockPredict. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
