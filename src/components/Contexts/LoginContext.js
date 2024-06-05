import React, { useState, useEffect, createContext, useContext } from 'react'

// Create a context for the login state
const LoginContext = createContext()

// Create a provider component for the login state
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const email = sessionStorage.getItem('email')
    setIsLoggedIn(!!email)
  }, [])

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  )
}

// Create a hook to use the login state
export const useLogin = () => {
  return useContext(LoginContext)
}
