import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import {  MemoryRouter, Route, Routes } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect' // for matchers like toBeInTheDocument
import { Home } from '../../../src/components/Home/Home.jsx'

// Utility function to render the component with React Router context
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render( 
  <MemoryRouter initialEntries={[route]}>
    {ui}
  </MemoryRouter>)
}

describe('Home component', () => {
  test('renders welcome message', () => {
    renderWithRouter(<Home />)
    const heading = screen.getByText(/Welcome to Staffoji!/i)
    expect(heading).toBeInTheDocument()
  })

  test('renders game instructions', () => {
    renderWithRouter(<Home />)
    const instructions = screen.getByText(/Tune up your instruments and get ready to play the game!/i)
    expect(instructions).toBeInTheDocument()
  })

  test('renders developer information for Vanja Maric', () => {
    renderWithRouter(<Home />)
    const vanjaInfo = screen.getByText(/My name is Vanja Maric and I am a software developer/i)
    expect(vanjaInfo).toBeInTheDocument()
  })

  test('renders developer information for Robert', () => {
    renderWithRouter(<Home />)
    const robertInfo = screen.getByText(/Robert is an educated system developer/i)
    expect(robertInfo).toBeInTheDocument()
  })

  test('renders Play Game button', () => {
    renderWithRouter(<Home />)
    const playButton = screen.getByRole('button', { name: /Play Game/i })
    expect(playButton).toBeInTheDocument()
  })

  test('renders contribution links', () => {
    renderWithRouter(<Home />)
    const contributionLinks = screen.getByText(/Attributions:/i)
    expect(contributionLinks).toBeInTheDocument()
  })
  
  test('redirects to / after the Play Button is clicked', () => {
    const { container } = renderWithRouter(
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<div>Game Page</div>} />
      </Routes>,
      { route: '/home' }
    )

    const playButton = screen.getByRole('button', { name: /Play Game/i })
    fireEvent.click(playButton)

    expect(container.innerHTML).toMatch('Game Page')
  })
})
