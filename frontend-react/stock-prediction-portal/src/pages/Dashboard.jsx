import React, { useState } from 'react'
import api, { baseURL } from '../api/axiosInstance.js'


const inputStyles =
  'h-[42px] w-full rounded-md border bg-primary-bg px-3 text-[15px] text-primary-text placeholder:text-gray-500 transition-colors focus:outline-none focus:ring-2'

const normalBorder = 'border-border-muted focus:border-accent focus:ring-accent/25'

const labelStyles = 'mb-2 block text-sm font-medium text-primary-text'

const chartCaptionStyles = 'mb-2 mt-7 text-sm font-medium text-primary-text'

const toMediaUrl = (path) => `${baseURL.replace(/\/$/, '')}${path}`

const Dashboard = () => {
  const [ticker, setTicker] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [plotImg, setPlotImg] = useState('')
  const [plot100Dma, setPlot100Dma] = useState('')
  const [plot200Dma, setPlot200Dma] = useState('')
  const [plotPrediction, setPlotPrediction] = useState('')
  const [metrics, setMetrics] = useState(null)

  const handleTickerChange = (e) => {
    setTicker(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setPlotImg('')
    setPlot100Dma('')
    setPlot200Dma('')
    setPlotPrediction('')
    setMetrics(null)
    setLoading(true)
    try{
      const response = await api.post('api/predict/', {ticker:ticker})
      if(response.data.error){
        setError(response.data.error)
        return
      }
      setPlotImg(toMediaUrl(response.data.plot_img))
      setPlot100Dma(toMediaUrl(response.data.plot_100_dma))
      setPlot200Dma(toMediaUrl(response.data.plot_200_dma))
      setPlotPrediction(toMediaUrl(response.data.plot_prediction))
      setMetrics({
        mse: response.data.mse,
        rmse: response.data.rmse,
        r2: response.data.r2,
      })
    }
    catch(err){
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-76px)] items-center py-14">
      <div className={`mx-auto w-full px-5 transition-[max-width] ${plotImg ? 'max-w-[720px]' : 'max-w-[440px]'}`}>
        <div className="rounded-lg border border-border-muted bg-surface p-7 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-primary-text">
            Stock Prediction
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-secondary-text">
            Enter a ticker symbol to see its forecast.
          </p>

          {error && (
            <p className="mt-5 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-sm text-red-400">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mt-7">
              <label htmlFor="ticker" className={labelStyles}>Ticker</label>
              <input
                type="text"
                id="ticker"
                name="ticker"
                value={ticker}
                autoComplete="off"
                placeholder="e.g. AAPL"
                required
                className={`${inputStyles} ${normalBorder}`}
                onChange={handleTickerChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 h-[42px] w-full cursor-pointer rounded-md border border-accent bg-accent text-[15px] font-semibold text-[#08110b] transition-colors hover:border-accent-dark hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-accent disabled:hover:bg-accent"
            >
              {loading ? 'Predicting...' : 'Predict'}
            </button>
          </form>

          {plotImg && (
            <>
              <p className={chartCaptionStyles}>Closing price</p>
              <img
                src={plotImg}
                alt={`Closing price chart for ${ticker}`}
                className="w-full rounded-md border border-border-muted"
              />
            </>
          )}

          {plot100Dma && (
            <>
              <p className={chartCaptionStyles}>100-day moving average</p>
              <img
                src={plot100Dma}
                alt={`100-day moving average chart for ${ticker}`}
                className="w-full rounded-md border border-border-muted"
              />
            </>
          )}

          {plot200Dma && (
            <>
              <p className={chartCaptionStyles}>200-day moving average</p>
              <img
                src={plot200Dma}
                alt={`200-day moving average chart for ${ticker}`}
                className="w-full rounded-md border border-border-muted"
              />
            </>
          )}

          {plotPrediction && (
            <>
              <p className={chartCaptionStyles}>Predicted vs. actual price</p>
              <img
                src={plotPrediction}
                alt={`Predicted vs. actual price chart for ${ticker}`}
                className="w-full rounded-md border border-border-muted"
              />
            </>
          )}

          {metrics && (
            <>
              <p className={chartCaptionStyles}>Model evaluation</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-md border border-border-muted bg-primary-bg p-4 text-center">
                  <p className="text-xs text-secondary-text">MSE</p>
                  <p className="mt-1 text-lg font-semibold text-primary-text">{metrics.mse.toFixed(4)}</p>
                </div>
                <div className="rounded-md border border-border-muted bg-primary-bg p-4 text-center">
                  <p className="text-xs text-secondary-text">RMSE</p>
                  <p className="mt-1 text-lg font-semibold text-primary-text">{metrics.rmse.toFixed(4)}</p>
                </div>
                <div className="rounded-md border border-border-muted bg-primary-bg p-4 text-center">
                  <p className="text-xs text-secondary-text">R²</p>
                  <p className="mt-1 text-lg font-semibold text-primary-text">{metrics.r2.toFixed(4)}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default Dashboard
