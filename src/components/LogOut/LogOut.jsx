/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react'
import { LogOutCss } from './LogOut.css.jsx'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../Contexts/LoginContext'

const LogIn = () => {
  const { isLoggedIn, setIsLoggedIn } = useLogin()
  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem('email')
    setIsLoggedIn(false) // Set isLoggedIn to false
    console.log('Logout successful')
  }

  useEffect(() => {
    console.log('checking id the user is logged')

    const email = sessionStorage.getItem('email')
    console.log(email)
    if (email) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [setIsLoggedIn])

  const handleGoToHomePage = () => {
    console.log('handle go to home page')
    navigate('../home')
  }

  return (
    <div css={LogOutCss} className="container">
      {!isLoggedIn ? (
        <>
          <h2 className="text-center mb-4">Go back to Home page</h2>
          <div className="text-center">
            <button onClick={handleGoToHomePage}>Home</button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-center mb-4">
            Are you sure that you want to Log Out?
          </h2>
          <div className="text-center">
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </>
      )}
    </div>
  )
}

export default LogIn
