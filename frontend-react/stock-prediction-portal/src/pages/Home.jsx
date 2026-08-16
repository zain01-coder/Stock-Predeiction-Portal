import React from 'react'
import './Home.css'
import Button from '../components/Button'

const Home = () => {
  return (
    <div className="home-page">
      <main id="top" className="home-main">
        <section className="home-hero" aria-labelledby="home-hero-title">
          <div className="container home-hero-container">
            <h1 id="home-hero-title" className="home-hero-title">
              <span className="home-hero-title-line">AI-Powered</span>
              <span className="home-hero-title-line">
                <span className="home-hero-accent">Stock Prediction</span> Portal
              </span>
            </h1>
            <p className="home-hero-description">
              Get intelligent price forecasts, market insights and smarter investment decisions with machine learning.
            </p>
            <div className="home-hero-actions">
              <Button text='Login' variant="outline" />
              <Button text='Get Started'/>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
