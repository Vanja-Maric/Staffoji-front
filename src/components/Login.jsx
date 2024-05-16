import React, { useState } from 'react';

const Login = () => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:8083/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const users = await response.json();
        console.log(users);
      } else {
        console.error('Failed to fetch users');
      }
    };
  
    return (
      <div>
        <button onClick={fetchUsers}>Fetch Users</button>
      </div>
    );
  };

  
  export default Login;