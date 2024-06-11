/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

/**
 * CSS styles for the Home component.
 */
export const HomeCss = css`
  h1 {
    margin: 0;
    font-size: 54px;
    margin-bottom: 30px;
    text-align: center;
  }

  #contributions {
    font-size: 10px;
    text-align: center;
  }

  #contributions a {
    text-decoration: underline;
    pointer-events: auto;
  }

  .alinkedin {
    text-decoration: underline;
    pointer-events: auto;
  }

  p {
    font-size: 26px;
    margin-bottom: 20px;
    text-align: justify;
  }

  button {
    font-size: 24px;
    color: white;
    background-color: #3b6621;
    border: none;
    border-radius: 30px;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    font-family: 'Times New Roman', Times, serif;
  }

  button:hover {
    background-color: #385116;
    transform: translate3d(0, -2px, 0);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  a {
    text-decoration: none;
  }

  .buttons {
    justify-content: center;
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    flex-shrink: 0;
  }

  @media (max-width: 900px) {
    h1 {
      font-size: 50px;
    }

    p {
      font-size: 25px;
    }

    button {
      white-space: nowrap;
      font-size: 20px;
      padding: 10px 18px;
      margin: 8px;
    }
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 35px;
    }

    p {
      font-size: 18px;
    }

    button {
      white-space: nowrap;
      font-size: 18px;
      padding: 8px 16px;
      margin: 5px;
    }
  }
`
