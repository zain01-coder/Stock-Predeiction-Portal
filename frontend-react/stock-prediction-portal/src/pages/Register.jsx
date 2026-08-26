import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import api from '../api/axiosInstance.js'


// One shared class string so every input looks the same
const inputStyles =
    'h-[42px] w-full rounded-md border bg-primary-bg px-3 text-[15px] text-primary-text placeholder:text-gray-500 transition-colors focus:outline-none focus:ring-2'

// The border colour is kept separate so we can swap it when there is an error
const normalBorder = 'border-border-muted focus:border-accent focus:ring-accent/25'
const errorBorder = 'border-red-500 focus:border-red-500 focus:ring-red-500/25'

const labelStyles = 'mb-2 block text-sm font-medium text-primary-text'

const Register = () =>  {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState({})
    const [passwordError, setPasswordError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        // Hide the message from the previous attempt before trying again
        setSuccess(false)

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match')
            return
        }

        setPasswordError('')
        console.log('Form is valid:', { username, email, password })
        const userData = {
            username, email, password
        }

        // Turned on here, after the checks, so the button only spins
        // while we are really waiting for the backend
        setLoading(true)

        try{
            const response = await api.post('accounts/api/register/', userData)
            setError({})
            setSuccess(true)

            // Empty the form so the user does not send the same details twice
            setUsername('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        }
        catch(err){
            setError(err.response.data)
            console.error('Registeration Error: ' , err.response.data)
        }
        finally{
            setLoading(false)
        }

    }



    return (
        <>

            <main className="flex min-h-[calc(100vh-76px)] items-center py-14">
                <div className="mx-auto w-full max-w-[440px] px-5">

                    <div className="rounded-lg border border-border-muted bg-surface p-7 sm:p-8">
                        <h1 className="text-2xl font-bold tracking-tight text-primary-text">
                            Create your account
                        </h1>
                        <p className="mt-2 text-sm leading-relaxed text-secondary-text">
                            Start forecasting the market with machine learning.
                        </p>

                        {success && (
                            <p
                                className="mt-5 rounded-md border border-accent/40 bg-accent/10 px-3 py-2.5 text-sm text-accent"
                                role="status"
                            >
                                Account created successfully. You can now log in.
                            </p>
                        )}

                        <form className="mt-7" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className={labelStyles}>Username</label>
                                {error.username && (
                                    <p className="mb-2 text-sm text-red-500">{error.username}</p>
                                )}
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

                            <div className="mb-4">
                                <label htmlFor="email" className={labelStyles}>Email</label>
                                {error.email && (
                                    <p className="mb-2 text-sm text-red-500">{error.email}</p>
                                )}
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className={`${inputStyles} ${normalBorder}`}
                                    onChange={(element) => { setEmail(element.target.value) }}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className={labelStyles}>Password</label>
                                {error.password && (
                                    <p className="mb-2 text-sm text-red-500">{error.password}</p>
                                )}
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

                            <div className="mb-6">
                                <label htmlFor="confirmPassword" className={labelStyles}>Confirm password</label>
                                {passwordError && (
                                    <p className="mb-2 text-sm text-red-500">{passwordError}</p>
                                )}
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    autoComplete="new-password"
                                    placeholder="Re-enter your password"
                                    className={`${inputStyles} ${passwordError ? errorBorder : normalBorder}`}
                                    onChange={(element) => {
                                        setConfirmPassword(element.target.value)
                                        setPasswordError('')
                                    }}
                                />
                            </div>
                            
                            <button
                                type="submit"
                                disabled={loading}
                                className="h-[42px] w-full cursor-pointer rounded-md border border-accent bg-accent text-[15px] font-semibold text-[#08110b] transition-colors hover:border-accent-dark hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-accent disabled:hover:bg-accent"
                            >
                                {loading ? 'Creating account...' : 'Create account'}
                            </button>
                        </form>

                        <div className="mt-6 border-t border-border-muted pt-5 text-center text-sm text-secondary-text">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-accent hover:underline">
                                Log in
                            </Link>
                        </div>
                    </div>

                    <p className="mt-5 text-center text-xs leading-relaxed text-secondary-text">
                        By creating an account you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </main>

        </>
    )
}

export default Register
