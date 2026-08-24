import React, { useState } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const Navbar = () => {
  // Controls the mobile dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="min-h-[76px] border-b border-border-muted" aria-label="Main navigation">
      <div className="mx-auto w-full max-w-[1140px] px-4 py-3.5 md:py-3">

        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-primary-text"
            aria-label="StockPredict home"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-accent"
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
            <span>Stock<span className="text-accent">Predict</span></span>
          </Link>

          {/* Hamburger button, only visible on small screens */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-pointer rounded-md border border-border-muted p-2 text-primary-text focus:outline-none focus:ring-2 focus:ring-accent/30 md:hidden"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>

          {/* Desktop buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Button text="Login" to="/" variant="outline" />
            <Button text="Get Started" to="/register" />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mt-3.5 flex flex-col gap-2.5 border-t border-border-muted pt-3.5 md:hidden">
            <Button text="Login" to="/" variant="outline" className="w-full" />
            <Button text="Get Started" to="/register" className="w-full" />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
