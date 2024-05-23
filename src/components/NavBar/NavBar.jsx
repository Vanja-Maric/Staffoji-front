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
import  LogIn from '../LogIn/LogIn.jsx'
import SignUp from '../SignUp/SignUp.jsx'
import  Notification  from '../Notification/Notification.jsx'

// import { HighScores } from '../HighScores'
// import { SingUp } from '../SingUp'
import { PageNotFound } from '../PageNotFound/PageNotFound'
import { TurnOnYourMic } from '../TurnOnYourMic/TurnOnYourMic'
import { NavBarCss } from './NavBar.css.jsx'

/**
 * Renders a navigation bar with links to different pages.
 *
 * @returns {JSX.Element} A navigation bar component.
 */
export function NavBar() {
  const [mic, setMic] = useState(false)

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

  // console.log('rendering')

  /**
   * State that tracks whether the checkbox is checked or not. Used to toggle the menu in mobile view.
   */
  const [checkChecked, setChecked] = useState(false)

  /**
   * Handles the change event of the checkbox.
   */
  function handelChecked() {
    setChecked(!checkChecked)
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
              <NavLink to="/home" onClick={handelChecked}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={handelChecked}>
                Game
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" onClick={handelChecked}>
                Log In
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" onClick={handelChecked}>
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink to="/Notification" onClick={handelChecked}>
                Notification
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="page-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
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

/* <li>
    <NavLink to="/high-scores" onClick={handelChecked}>
      High Scores
    </NavLink>
  </li>
  <li id="atRightSide">
    <NavLink to="/sign-up" onClick={handelChecked}>
      Create account
    </NavLink>
  </li> /*

  /* <Route path="/high-scores" element={<HighScores />} />
     <Route path="/sign-up" element={<SingUp />} /> */
