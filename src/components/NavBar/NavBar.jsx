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
import LogIn from '../Login/Login.jsx'
import LogOut from '../LogOut/LogOut.jsx'
import SignUp from '../SignUp/SignUp.jsx'
import Notification from '../Notification/Notification.jsx'

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
  const { isLoggedIn, setIsLoggedIn } = useLogin()
  const [isUserAdmin, setIsUserAdmin] = useState(false)
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
    console.log('checking id the user is logged')
    getLocalStream() // Call async function
    const email = sessionStorage.getItem('email')

    if (email) {
      setIsLoggedIn(true)
      if (email) {
        console.log('Setting admin true')
        setIsUserAdmin(true)
      }
    } else {
      setIsLoggedIn(false)
    }
  }, [checkChecked, isLoggedIn])

  /**
   * Handles the change event of the checkbox.
   */
  function handleChecked() {
    setChecked(!checkChecked)
    console.log('handling checkChecked')
  }

  return (
    <div css={NavBarCss}>
      <Router basename="/">
        <div className="navigation">
          <input
            type="checkbox"
            id="checkbox_toggle"
            checked={checkChecked}
            onChange={() => setChecked(true)}
          />
          <label htmlFor="checkbox_toggle" className="hamburger">
            &#9776;
          </label>
          <ul className="menu">
            <li>
              <NavLink to="/home" onClick={handleChecked}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={handleChecked}>
                Game
              </NavLink>
            </li>
            {/* Conditionally render the links */}
            {!isLoggedIn ? (
              <>
                <li>
                  <NavLink to="/login" onClick={handleChecked}>
                    Log In
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" onClick={handleChecked}>
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {/* Add links or components to render when the user is logged in */}
                <li>
                  <NavLink to="/profile" onClick={handleChecked}>
                    Profile
                  </NavLink>
                </li>
                {/* Render Notification link only if user is admin */}
                {isUserAdmin && (
                  <li>
                    <NavLink to="/notification" onClick={handleChecked}>
                      Notification
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/logout" onClick={handleChecked}>
                    Log Out
                  </NavLink>
                </li>
                <div className="user-info">
                  <p>
                    Hello {JSON.parse(sessionStorage.getItem('email')).username}
                    !
                  </p>
                </div>
              </>
            )}
          </ul>
        </div>

        <div className="page-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={mic ? <Game /> : <TurnOnYourMic />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/Notification" element={<Notification />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}
