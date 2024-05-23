/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { LogInCss } from './LogIn.css.jsx'
import { Navigate } from 'react-router-dom'

const LogIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [logInFailedMessage, setLogInFailedMessage] = useState('')

  if (isLoggedIn) {
    return <Navigate to='/home' />
  }

  const handleLogin = async (event) => {
    console.log('logging in')
    event.preventDefault()

     const response = await fetch('https://staffoji-game-6d75a67b1765.onrender.com/user/login', {
    //  const response = await fetch('http://localhost:8083/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: loginUsername, password: loginPassword }),
    })

    if (response.ok) {
      console.log('Login successful')
      sessionStorage.setItem('username', loginUsername) // Store username in localStorage
      setIsLoggedIn(true)
    } else {
      setLogInFailedMessage('Login failed. Please try again!')
    }
  }

  /*useEffect(() => {
    const username = localStorage.getItem('username')

    if (username) {
      console.log(`Welcome back, ${username}!`)
      setIsLoggedIn(true)
    }
  }, [])*/

/*  const handleLogout = () => {
    localStorage.removeItem('username') // Remove username from localStorage
    setIsLoggedIn(false) // Set isLoggedIn to false
    console.log('Logout successful')
  }*/

  return (
    <div css={LogInCss} className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Log In</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input type="text" className="form-control" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input type="password" className="form-control" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary me-2">Login</button>
          </form>
          {logInFailedMessage !== '' && (
              <div className="text-danger text-center">{logInFailedMessage}</div>
            )}
        </div>
      </div>
    </div>
  )
}

export default LogIn