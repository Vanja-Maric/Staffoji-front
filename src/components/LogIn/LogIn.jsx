/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import { LogInCss } from './LogIn.css'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../Contexts/LoginContext'

const LogIn = () => {
  const { isLoggedIn, setIsLoggedIn } = useLogin()
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [logInFailedMessage, setLogInFailedMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    console.log('checking id the user is logged')

    const email = JSON.parse(sessionStorage.getItem('email'))
    console.log(email)
    console.log(email, 'email from context' )
    if (email) {
      setIsLoggedIn('user')
      if (email.admin === 'true') {
        setIsLoggedIn('admin')
      }
    } else {
      setIsLoggedIn('')
    }
  }, [setIsLoggedIn])

  const handleGoToHomePage = () => {
    console.log('handle go to home page')
    navigate('../home')
  }

  const handleLogin = async (event) => {
    console.log('logging in')
    event.preventDefault()

     const response = await fetch('https://oyster-app-e4o6y.ondigitalocean.app/user/login', {
  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    })

    if (response.ok) {
      console.log('Login successful')
      const resp = await response.json()
      const user = {
        username: resp.username,
        email: resp.email,
        admin: resp.admin,
      }
      console.log(user)
      console.log(resp.admin)

      sessionStorage.setItem('email', JSON.stringify(user)) // Store whole user and change session name from email to user
      // TODO: BEFORE PRODUCTION SAVE SESSIONS TO REDIS SO THAT IT IS SAfER
      console.log(sessionStorage.getItem(user))
      console.log(resp.admin, 'admin?')
      if (resp.admin) {
        console.log('Setting login as admin')
        setIsLoggedIn('admin')
      } else { 
        console.log('Setting login as user')
        setIsLoggedIn('user')
      }
      console.log('Logged in as' + isLoggedIn)
    } else {
      setLogInFailedMessage('Login failed. Please try again!')
    }
  }

  return (
    <div css={LogInCss} className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          {!isLoggedIn ? (
            <>
              <h2 className="text-center mb-4">Log In</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary me-2">
                  Login
                </button>
              </form>
              {logInFailedMessage !== '' && (
                <div className="text-danger text-center">
                  {logInFailedMessage}
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-center mb-4">
                You have successfully logged in!
              </h2>
              <div className="text-center">
                <button onClick={handleGoToHomePage}>Home</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LogIn
