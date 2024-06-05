import './App.css'
import { NavBar } from './components/NavBar/NavBar.jsx'
import { LoginProvider } from './components/Contexts/LoginContext'

/**
 * The root component of the application.
 * Renders the main container div and the navigation bar.
 *
 * @returns {JSX.Element} The root component of the application.
 */
function App() {
  return (
    <LoginProvider>
      <div className="div-container">
        <NavBar />
      </div>
    </LoginProvider>
  )
}

export default App
