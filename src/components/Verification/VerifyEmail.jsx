/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VerifyEmailCss } from './VerifyEmail.css'

const VerifyEmail = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('Verifying your account...')
  const [verificationSuccessful, setVerificationSuccessful] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    fetch(`https://oyster-app-e4o6y.ondigitalocean.app/user/verify?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          )
        }
        return response.text()
      })
      .then((data) => {
        setMessage('Congratulations, your account has been verified.')
        setVerificationSuccessful(true)
      })
      .catch((error) => {
        console.error('Error:', error)
        setMessage('Email verification failed.')
      })
  }, [navigate])

  const handleGoToLogin = () => {
    navigate('/login')
  }

  return (
    <div css={VerifyEmailCss} className="container">
      <h2 className="text-center mb-4">{message}</h2>
      <div className="text-center">
        {verificationSuccessful && (
          <button id="custom" onClick={handleGoToLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail
