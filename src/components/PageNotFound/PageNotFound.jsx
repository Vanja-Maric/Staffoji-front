/** @jsxImportSource @emotion/react */
import { PageNotFoundCss } from './PageNotFound.css.jsx'

/**
 * A React component that renders a "Page Not Found" error page.
 *
 * @returns {JSX.Element} A page not found component.
 */
export function PageNotFound() {
  return (
    <div css={PageNotFoundCss}>
      <h1>Page Not Found</h1>
      <p>Sorry, we couldn't find the page you were looking for.</p>
    </div>
  )
}
