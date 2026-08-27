import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'


// One shared class string so every input looks the same
const inputStyles =
    'h-[42px] w-full rounded-md border bg-primary-bg px-3 text-[15px] text-primary-text placeholder:text-gray-500 transition-colors focus:outline-none focus:ring-2'

// The border colour is kept separate so we can swap it when there is an error
const normalBorder = 'border-border-muted focus:border-accent focus:ring-accent/25'

const labelStyles = 'mb-2 block text-sm font-medium text-primary-text'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {setIsLoggedin} = useContext(AuthContext)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = { username, password }

        // Clear the message from the last attempt
        setError('')
        setLoading(true)

        try {
            const response = await api.post('accounts/api/token/', userData)
            console.log(response.data)
            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            console.log('Login Successful')
            setIsLoggedin(true)
            navigate('/')
        }
        catch {
            setError('Invalid credentials')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>

            <main className="flex min-h-[calc(100vh-76px)] items-center py-14">
                <div className="mx-auto w-full max-w-[440px] px-5">

                    <div className="rounded-lg border border-border-muted bg-surface p-7 sm:p-8">
                        <h1 className="text-2xl font-bold tracking-tight text-primary-text">
                            Welcome back
                        </h1>
                        <p className="mt-2 text-sm leading-relaxed text-secondary-text">
                            Log in to see your forecasts and saved stocks.
                        </p>

                        {error && (
                            <p className="mt-5 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-sm text-red-400">
                                {error}
                            </p>
                        )}

                        <form className="mt-7" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className={labelStyles}>Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    autoComplete="username"
                                    placeholder="johndoe"
                                    className={`${inputStyles} ${normalBorder}`}
                                    onChange={(element) => { setUsername(element.target.value) }}
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className={labelStyles}>Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    autoComplete="new-password"
                                    placeholder="At least 8 characters"
                                    className={`${inputStyles} ${normalBorder}`}
                                    onChange={(element) => { setPassword(element.target.value) }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="h-[42px] w-full cursor-pointer rounded-md border border-accent bg-accent text-[15px] font-semibold text-[#08110b] transition-colors hover:border-accent-dark hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-accent disabled:hover:bg-accent"
                            >
                                {loading ? 'Logging...' : 'Login'}
                            </button>
                        </form>

                        <div className="mt-6 border-t border-border-muted pt-5 text-center text-sm text-secondary-text">
                            New to StockPredict?{' '}
                            <Link to="/register" className="font-semibold text-accent hover:underline">
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}

export default Login
