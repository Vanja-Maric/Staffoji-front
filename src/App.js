import './App.css'
import { NavBar } from './components/NavBar/NavBar.jsx'

/**
 * The root component of the application.
 * Renders the main container div and the navigation bar.
 *
 * @returns {JSX.Element} The root component of the application.
 */
function App() {
  return (
    <>
      <div className="div-container">
        <NavBar />
      </div>
    </>
  )
}

export default App
