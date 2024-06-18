import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Footer } from '../../../src/components/Footer/Footer.jsx'

describe('Footer component', () => {
  test('renders footer content', () => {
    render(<Footer />)

    expect(screen.getByText(/Copyright © 2024 Serz/i)).toBeInTheDocument()
    expect(screen.getByText(/Vanja Maric: tnjmaric780@hotmail.com/i)).toBeInTheDocument()
    expect(screen.getByText(/Robert Milicevic: robert.milicevic.jobb@gmail.com/i)).toBeInTheDocument()
  })
})
