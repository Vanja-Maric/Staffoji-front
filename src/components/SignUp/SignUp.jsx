/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { SignUpCss } from './SignUp.css.jsx'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [createAccountUsername, setCreateAccountUsername] = useState('')
  const [createAccountPassword, setCreateAccountPassword] = useState('')
  const [email, setEmail] = useState('')
  const [premium, setPremium] = useState(false)
  const [signUpFailedMessage, setSignUpFailedMessage] = useState('')
  const navigate = useNavigate() // Initialize the navigate function

  const goToLogInPage = () => {
    console.log('go to login page')
    navigate('../login')
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    console.log('signing up')
    // const response = await fetch('https://staffoji-game-last.onrender.com/user/', {
    //TODO: change to the following line when deploying
    const response = await fetch('http://localhost:8083/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: createAccountUsername,
        password: createAccountPassword,
        email: email,
      }),
    })

    if (response.ok) {
      console.log('Sign up successful')
      setIsSignedUp(true)
    } else {
      const errorData = await response.json()
      console.log(errorData.message)
      setSignUpFailedMessage(`Sign up failed: ${errorData.message}`)
      console.log(signUpFailedMessage)
    }
  }

  return (
    <div css={SignUpCss} className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {isSignedUp ? (
            <>
              <h2 className="text-center mb-4">
                Sign up successful. Go to Log In!
              </h2>
              <div className="text-center">
                {' '}
                {/* Wrap the button in a div and apply text-center class */}
                <button onClick={goToLogInPage} className="btn btn-primary">
                  Log In
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSignUp}>
                <div className="mb-3">
                  <label className="form-label">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={createAccountUsername}
                    onChange={(e) => setCreateAccountUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={createAccountPassword}
                    onChange={(e) => setCreateAccountPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="premium"
                    checked={premium}
                    onChange={(e) => setPremium(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="premium">
                    Premium
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </form>
              {signUpFailedMessage !== '' && (
                <div className="text-danger text-center">
                  {signUpFailedMessage}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignUp
