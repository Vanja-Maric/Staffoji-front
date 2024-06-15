/** @jsxImportSource @emotion/react */
import React from 'react'
import { useState, useEffect } from 'react'
import {
  NavLink,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { Home } from '../Home/Home'
import { Game } from '../StaffojiGame/Game.jsx'
import LogIn from '../LogIn/LogIn.jsx'
import LogOut from '../LogOut/LogOut.jsx'
import SignUp from '../SignUp/SignUp.jsx'
import Notification from '../Notification/Notification.jsx'
import VerifyEmail from '../Verification/VerifyEmail.jsx'
import 'bootstrap/dist/css/bootstrap.css'


// import { HighScores } from '../HighScores'
// import { SingUp } from '../SingUp'
import { PageNotFound } from '../PageNotFound/PageNotFound'
import { TurnOnYourMic } from '../TurnOnYourMic/TurnOnYourMic'
import { NavBarCss } from './NavBar.css.jsx'
import { useLogin } from '../Contexts/LoginContext'

/**
 * Renders a navigation bar with links to different pages.
 *
 * @returns {JSX.Element} A navigation bar component.
 */
export function NavBar() {
  const [mic, setMic] = useState(false)
  const { isLoggedIn } = useLogin()
  const [checkChecked, setChecked] = useState(false)

  // Get michrophon acess - If it is not turned on, do not open game page
  async function getLocalStream() {
    try {
      await navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      setMic(true)
    } catch (err) {
      console.error(`you got an error: ${err}`)
      setMic(false)
    }
  }


  useEffect(() => {
    getLocalStream() // Call async function
  }, [])

  /**
   * Handles the change event of the checkbox.
   */
  function handleChecked() {
    setChecked(!checkChecked)

  }

  return (
    <div css={NavBarCss}>
      <Router basename="/">
        <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar" >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
            <img src="/favicon.ico" alt="Logo" width="30" height="24" />
              Staffoji</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home" onClick={handleChecked}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" onClick={handleChecked}>
                    Game
                  </NavLink>
                </li>
                {isLoggedIn === 'user' ? (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/profile" onClick={handleChecked}>
                        Profile
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/logout" onClick={handleChecked}>
                        Log Out
                      </NavLink>
                    </li>
                    <div className="user-info navbar-text">
                      <p>
                        Hello {JSON.parse(sessionStorage.getItem('email')).username}!
                      </p>
                    </div>
                  </>
                ) : isLoggedIn === 'admin' ? (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/profile" onClick={handleChecked}>
                        Profile
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/notification" onClick={handleChecked}>
                        Notification
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/logout" onClick={handleChecked}>
                        Log Out
                      </NavLink>
                    </li>
                    <div className="user-info navbar-text float-right">
                      <p>
                        Hello {JSON.parse(sessionStorage.getItem('email')).username}!
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login" onClick={handleChecked}>
                        Log In
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/signup" onClick={handleChecked}>
                        Sign Up
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div className="page-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify" element={<VerifyEmail />} />
            <Route path="/" element={mic ? <Game /> : <TurnOnYourMic />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/notification" element={<Notification />} />
          </Routes>
        </div>
      </Router>
    </div>
    
  )
}
