/** @jsxImportSource @emotion/react */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { HomeCss } from './Home.css.jsx'

/**
 * Renders the Home component, which displays the main page of the Staffoji game.
 *
 * @returns {JSX.Element} A Home component.
 */
export function Home() {
  return (
    <div css={HomeCss}>
      <h1>Welcome to Staffoji!</h1>
      <p>
        Get ready to rock and roll with Staffoji! Tune up your instruments and
        get ready to play the game that's taking the music world by storm!
      </p>
      <p>
        Play the first note to make the character start moving. Once you stop
        playing, the character will advance towards the next musical clef. New
        notes will appear at the clef, indicating the available directions. Play
        the correct note corresponding to the desired direction to move. Make
        sure to tune your instrument A = 442.
      </p>

      <p className="buttons">
        <NavLink to="/game">
          <button>Play Game</button>
        </NavLink>
      </p>
    </div>
  )
}

/* TEXT FOR LOGGED USERS */
/*  <NavLink to="/sign-up">
    <button>Create account</button>
    </NavLink> p*/
