/** @jsxImportSource @emotion/react */
import { TurnOnYourMicCss } from './TurnOnYourMic.css.jsx'

/**
 * A React component that renders a "Page Not Found" error page.
 *
 * @returns {JSX.Element} A page not found component.
 */
export function TurnOnYourMic() {
  function handleButtonClick() {
    window.location.reload(false)
  }
  return (
    <div css={TurnOnYourMicCss}>
      <h1>Microphone access denied</h1>
      <p>
        Please allow access to the microphone on your computer. You need
        microphone access to play this game.
      </p>
      <button onClick={handleButtonClick}>Reload</button>
    </div>
  )
}
