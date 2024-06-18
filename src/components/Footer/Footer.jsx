/** @jsxImportSource @emotion/react */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { FooterCss } from './Footer.css'

export function Footer() {
  return (
    <div css={FooterCss}>
      <footer className="footer py-3 custom-footer">
        <div className="container d-flex justify-content-around">
          <p>Copyright &copy; 2024 Serz</p>
          <p>Vanja Maric: tnjmaric780@hotmail.com</p>
          <p>Robert Milicevic: robert.milicevic.jobb@gmail.com</p>
        </div>
      </footer>
    </div>
  )
}
