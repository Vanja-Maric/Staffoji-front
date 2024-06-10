/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import 'bootstrap/dist/css/bootstrap.css'

/**
 * CSS styles for the NavBar component.
 */
export const NavBarCss = css`
.custom-navbar {
  background-color: #3b6621 !important;
}
.custom-navbar .navbar-brand,
.custom-navbar .nav-link,
.custom-navbar .navbar-text {
  color: #fff !important; /* Ensure the text color is white */
}

.custom-navbar .nav-link.active {
  color: #ccc !important;
}
`
