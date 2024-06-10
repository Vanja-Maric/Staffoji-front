import './App.css'
import { NavBar } from './components/NavBar/NavBar.jsx'
import { Footer } from './components/Footer/Footer.jsx'
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
      <div className="app">
        <div className="content">
          <NavBar />
        </div>
        <Footer className={'custom-footer'} />
      </div>
    </LoginProvider>
  )
}

export default App
