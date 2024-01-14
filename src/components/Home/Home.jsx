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
        Tune up your instruments and get ready to play the game! Play the first
        note to make the character start moving. Once you stop playing, the
        character will advance towards the next musical clef. New notes will
        appear at the clef, indicating the available directions. Play the
        correct note corresponding to the desired direction to move. Make sure
        to tune your instrument A = 442.
      </p>
      <p>
        My name is Vanja Maric and I am a software developer focused on web and
        Viola/violin teacher. I am passionate about music and technology and I
        am always looking for ways to combine the two. You can find me on{' '}
        <a
          className="alinkedin"
          href="https://www.linkedin.com/in/vanja-maric-98738b280/"
        >
          LinkedIn
        </a>
      </p>

      <p className="buttons">
        <NavLink to="/">
          <button>Play Game</button>
        </NavLink>
      </p>
      <p id="contributions">
        Attributions:
        <br />
        Cello, Bass:{' '}
        <a href="https://www.flaticon.com/free-icons/cello" title="cello icons">
          Cello icons created by Leremy - Flaticon;
        </a>
        Violin:{' '}
        <a
          href="https://www.flaticon.com/free-icons/violin"
          title="violin icons"
        >
          Violin icons created by khulqi Rosyid - Flaticon;
        </a>
        Guitar:{' '}
        <a
          href="https://www.flaticon.com/free-icons/guitar"
          title="guitar icons"
        >
          Guitar icons created by InfoBrother - Flaticon;
        </a>
        Piano, Flute:{' '}
        <a href="https://www.flaticon.com/free-icons/piano" title="piano icons">
          Piano icons created by Freepik - Flaticon;
        </a>
        Recorder:{' '}
        <a href="https://www.flaticon.com/free-icons/flute" title="flute icons">
          Flute icons created by kerismaker - Flaticon;
        </a>
        <br />
        <a href="https://www.gameart2d.com/license.html" title="attribution">
          {' '}
          Game objects, tiles, character, gui;
        </a>
        <a
          href="https://opengameart.org/content/woodland-fantasy"
          title="menu music attribution"
        >
          {' '}
          Menu music;{' '}
        </a>
        <a
          href="https://pixabay.com/sv/vectors/bakgrund-m%C3%B6nster-l%C3%B6v-l%C3%B6vverk-gr%C3%B6n-6642882/"
          title="Menu background attribution"
        >
          Menu background image;
        </a>
        <a href="https://opengameart.org/content/crystal-cave-song18">
          Game music;
        </a>
        <a href="https://opengameart.org/content/completion-sound">
          Coin sound;
        </a>
      </p>
    </div>
  )
}

/* TEXT FOR LOGGED USERS */
/*  <NavLink to="/sign-up">
    <button>Create account</button>
    </NavLink> p*/
