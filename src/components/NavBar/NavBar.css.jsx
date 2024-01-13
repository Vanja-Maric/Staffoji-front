/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
/**
 * CSS styles for the NavBar component.
 */
export const NavBarCss = css`
  height: 100%;
  .navigation {
    z-index: 100;
    background-color: #3b6621;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 60px;
    border-radius: 2px;
    overflow: hidden;
  }

  .page-content {
    max-height: calc(100vh - 60px);
  }

  p {
    margin: 30px;
  }

  .menu {
    height: 100%;
    padding: 0;
    list-style: none;
    margin: 0;
  }

  input[type='checkbox'] {
    display: none;
  }

  .hamburger {
    display: none;
    font-size: 28px;
    user-select: none;
  }

  li {
    height: 100%;
    padding: 0px;
    display: inline-block;
    font-size: 20px;
    text-align: center;
    color: #fff;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
    font-family: 'Times New Roman', Times, serif;
  }

  .menu #atRightSide {
    float: right;
  }

  li:hover {
    background-color: #63971e;
    transform: translate3d(0, -2px, 0);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  a {
    padding: 18px;
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 768px) {
    .menu {
      height: 100px;
      display: none;
      position: absolute;
      background: linear-gradient(to right, #6d913f, #3b6621, #6d913f);
      right: 0;
      left: 0;
      text-align: center;
      padding: 0;
      flex-direction: column;
    }

    .navigation {
      height: min-content;
    }

    li {
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
      margin: 0;
      padding: 0px;
    }

    .hamburger {
      padding: 4px; // This is changing height of nav bar also
      display: block;
      cursor: pointer;
      width: 30px;
    }

    a {
      height: 80%;
      padding: 0px;
      padding-top: 15px;
      width: 100%;
    }

    input[type='checkbox']:checked ~ .menu {
      display: flex;
    }

    input[type='checkbox']:checked ~ .hamburger {
      display: none;
    }

    p {
      margin: 4px;
    }
  }
`
