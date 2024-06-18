/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { NotificationCss } from './Notification.css.jsx'

const Notification = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [sendNow, setSendNow] = useState(false)
  const [date, setDate] = useState('')
  const [notificationTarget, setNotificationTarget] = useState('all')
  const [sendNotificationMessage, setSendNotificationMessage] = useState('')

  async function sendNotification(e) {
    e.preventDefault()

    const response = await fetch('http://localhost:8083/notification/', {
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
      setSendNotificationMessage('Notification sent')
    } else {
      const errorData = await response.json()
      setSendNotificationMessage(
        'Failed to send notification.',
        errorData.message
      )
    }
  }

  return (
    <div css={NotificationCss}>
      <div className="container">
        <h2 className="text-center">Send Notification</h2>
        <form onSubmit={sendNotification}>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message:</label>
            <textarea
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Recipient:</label>
            <select
              className="form-select"
              value={notificationTarget}
              onChange={(e) => setNotificationTarget(e.target.value)}
            >
              <option value="all">All</option>
              <option value="premium">Premium</option>
              <option value="notPremium">Non-Premium</option>
            </select>
          </div>
          <button
            type="button"
            className="btn btn2"
            onClick={() => setSendNow(!sendNow)}
          >
            {sendNow ? 'Cancel Immediate Send' : 'Send Immediately'}
          </button>

          {!sendNow && (
            <div className="mb-3">
              <label className="form-label">Date & Time:</label>
              <input
                type="datetime-local"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
          {sendNotificationMessage !== '' && (
            <div className="text-danger text-center">
              {sendNotificationMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Notification
