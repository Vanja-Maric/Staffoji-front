/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { NotificationCss } from './Notification.css.jsx'

const Notification = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [sendNow, setSendNow] = useState(false)
  const [date, setDate] = useState('')
  const [notificationTarget, setNotificationTarget] = useState('all')

  async function sendNotification(e) {
    e.preventDefault()

      const response = await fetch('https://staffoji-game-6d75a67b1765.onrender.com/notification/', {
      //TODO: change to the following line when deploying
      // const response = await fetch('http://localhost:8083/notification/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        message,
        notificationTarget,
        sendTime: sendNow ? new Date().toISOString() : date,
        sendNow,
      }),
    })
    console.log({ title, message, notificationTarget, date, sendNow })
    if (response.ok) {
      console.log('Notification sent')
    } else {
      const errorData = await response.json()
      console.error('Notification failed:', errorData.message)
    }
  }

  return (
    <div css={NotificationCss}>
      <div className="container">
        <h2 className="text-center">Send Notification</h2>
        <form onSubmit={sendNotification}>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Message:</label>
            <textarea className="form-control" value={message} onChange={e => setMessage(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Recipient:</label>
            <select className="form-select" value={notificationTarget} onChange={e => setNotificationTarget(e.target.value)}>
              <option value="all">All</option>
              <option value="premium">Premium</option>
              <option value="notPremium">Non-Premium</option>
            </select>
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={sendNow} onChange={e => setSendNow(e.target.checked)} />
              <label className="form-check-label">Send Immediately</label>
            </div>
          </div>

          {!sendNow && (
            <div className="mb-3">
              <label className="form-label">Date & Time:</label>
              <input type="datetime-local" className="form-control" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
          )}

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Notification