import React, { useState,useEffect } from 'react';
import { formElement } from './Notification.css.jsx'

const Notification = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sendNow, setSendNow] = useState(false);
  const [date, setDate] = useState('');
  const [topic, setTopic] = useState('');
  const [notificationTarget, setNotificationTarget] = useState('all');

  async function sendNotification(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:8083/notification/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        message: message,
        notificationTarget: notificationTarget,
        sendTime: sendNow ? new Date().toISOString() : date,
        sendNow:  sendNow
      }),
    });
    console.log({ title, message, notificationTarget, date, sendNow});
    if (response.ok) {
      console.log('Notification sent');
    } else {
      const errorData = await response.json();
      console.error('Notification failed:', errorData.message);
    }
  };

  return (
    <div>
      <h2>Send Notification</h2>
      <form onSubmit={sendNotification}>
        <label css={formElement}>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        
        <label css={formElement}>
          Message:
          <textarea value={message} onChange={e => setMessage(e.target.value)} required />
        </label>
        <label>

        Recipient:
        <select value={notificationTarget} onChange={e => setNotificationTarget(e.target.value)}>
          <option value="all">All</option>
          <option value="premium">Premium</option>
          <option value="notPremium">Non-Premium</option>
        </select>

        <button type="button" onClick={() => setSendNow(!sendNow)}>
        {sendNow ? 'Cancel Immediate Send' : 'Send Immediately'}
        </button>
        <label css={formElement}>
          Send Immediately:
          <input type="checkbox" checked={sendNow} onChange={e => setSendNow(e.target.checked)} />
        </label>
        {!sendNow && (
          <label>
            Date & Time:
            <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
          </label>
        )}
      </label>

        <button onClick={sendNotification}>Send</button>

 
      </form>
    </div>
  );
};

export default Notification;