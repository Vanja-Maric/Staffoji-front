import React, { useState,useEffect } from 'react';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
  
    useEffect(() => {
      // Simulate fetching notifications from an API
      setTimeout(() => {
        setNotifications([
          { id: 1, text: 'Notification 1' },
          { id: 2, text: 'Notification 2' },
          { id: 3, text: 'Notification 3' },
        ]);
      }, 2000);
    }, []);
  
    return (
      <div>
        <h2>Notifications</h2>
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>{notification.text}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default Notification;