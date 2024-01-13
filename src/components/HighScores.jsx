import React, { useState, useEffect } from 'react'

// COMMING IN VERSION 2.0.0

/**
 * React function component for displaying high scores.
 *
 * @returns {JSX.Element} The rendered high scores component.
 */
export function HighScores() {
  const [data, setData] = useState({})

  /**
   * State hook to store fetched data.
   */
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/message`, {
        mode: 'cors',
      })
      const json = await response.json()
      setData(json)
    }

    fetchData()
  }, [])

  return <p>{JSON.stringify(data.message)}</p>
}
