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
    <div css={HomeCss} className="container text-center pt-5">
      <h1 className="mb-4">Welcome to Staffoji!</h1>

      <p className="game-instructions mb-4">
        Tune up your instruments and get ready to play the game! Play the first
        note to make the character start moving. Once you stop playing, the
        character will advance towards the next musical clef. New notes will
        appear at the clef, indicating the available directions. Play the
        correct note corresponding to the desired direction to move. Make sure
        to tune your instrument A = 442.
      </p>
      <p className="developers mb-4">
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
      <p className="developers mb-4">
        Robert is an educated system developer with a deep passion for backend
        development, particularly using the Java programming language. He is
        responsible for the backend development in our project. You can find
        Robert on{' '}
        <a
          className="alinkedin"
          href="https://www.linkedin.com/in/robert-milicevic-5a2013149/"
        >
          LinkedIn
        </a>
      </p>

      <p className="buttons mb-4">
        <NavLink to="/">
          <button className="btn btn-success">Play Game</button>
        </NavLink>
      </p>

      <p id="contributions" className="small">
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
