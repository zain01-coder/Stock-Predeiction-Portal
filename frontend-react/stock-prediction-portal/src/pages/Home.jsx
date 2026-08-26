import React from 'react'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />

      <main id="top" className="flex min-h-[calc(100vh-76px)] items-center py-16 md:py-20">
        <div className="mx-auto w-full max-w-[840px] px-4 text-center">
          <h1 className="text-[2.4rem] leading-[1.08] font-extrabold tracking-[-0.055em] text-primary-text sm:text-6xl lg:text-[4.5rem]">
            <span className="block">AI-Powered</span>
            <span className="block">
              <span className="text-accent">Stock Prediction</span> Portal
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[620px] text-base leading-relaxed text-secondary-text sm:text-lg">
            Get intelligent price forecasts, market insights and smarter investment decisions with machine learning.
          </p>

          <div className="mx-auto mt-8 flex max-w-[280px] flex-col justify-center gap-3 sm:max-w-none sm:flex-row">
            <Button text="Login" to="/login" variant="outline" className="w-full sm:w-auto sm:min-w-[132px]" />
            <Button text="Get Started" to="/register" className="w-full sm:w-auto sm:min-w-[132px]" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Home
