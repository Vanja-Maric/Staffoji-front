/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

/**
 * CSS styles for the PageNotFound component.
 */
export const PageNotFoundCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;


  h1 {
    margin: 0;
    font-size: 60px;
    margin-bottom: 30px;
    text-align: justify;
    text-justify: inter-word;
  }

  p {
    font-size: 30px;
    margin-bottom: 20px
    text-align: center;
  }

  @media (max-width: 900px) {
    h1 {
      font-size: 50px;
    }

    p {
      font-size: 25px;
    }

    @media (max-width: 600px) {
      h1 {
        font-size: 35px;
      }
  
      p {
        font-size: 18px;
      }
    }  
  }
`
