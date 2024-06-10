/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import 'bootstrap/dist/css/bootstrap.css'

/**
 * CSS styles for the NavBar component.
 */
export const NavBarCss = css`
.custom-navbar {
  background-color: #3b6621 !important;
    font-size: 22px; /* Increase the font size */
    padding: 10px; /* Increase the size of the navbar */
}
.custom-navbar .navbar-brand,
.custom-navbar .nav-link,
.custom-navbar .navbar-text {
  color: #fff !important; /* Ensure the text color is white */
}

.custom-navbar .nav-link.active {
  color: #ccc !important;
}

.user-info {
  position: absolute;
  right: 26px;
  text-align: center;
  color: #fff;
}

`
