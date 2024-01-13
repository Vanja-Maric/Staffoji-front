/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

/**
 * CSS styles for the TurnOnYourMic component.
 */
export const TurnOnYourMicCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;

  h1 {
    margin: 0;
    font-size: 60px;
    margin-bottom: 30px;
    text-align: center;
  }

  p {
    font-size: 30px;
    margin-bottom: 20px;
    text-align: center;
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
