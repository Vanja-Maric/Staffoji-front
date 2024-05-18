import React, { useState,useEffect } from 'react';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [createAccountUsername, setCreateAccountUsername] = useState('');
  const [createAccountPassword, setCreateAccountPassword] = useState('');
  const [email, setEmail] = useState('');
  const [premium, setPremium] = useState(false);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');




  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8083/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: createAccountUsername,
        password: createAccountPassword,
        email: email,
      }),
    });

    if (response.ok) {
      console.log('Login successful');
    } else {
      const errorData = await response.json();
      console.error('Notification failed:', errorData.message);
    }
  };


  
 const handleLogin = async (event) => {
  event.preventDefault();

  const response = await fetch('http://localhost:8083/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: loginUsername, password: loginPassword }),
 
 });

  if (response.ok) {
    console.log('Login successful');
    localStorage.setItem('username', loginUsername); // Store username in localStorage
  } else {
    console.error('Login failed');
  }
};

useEffect(() => {
  const username = localStorage.getItem('username');

  if (username) {
    console.log(`Welcome back, ${username}!`);
    setIsLoggedIn(true)
  }
}, []);

const handleLogout = () => {
  localStorage.removeItem('username'); // Remove username from localStorage
  setIsLoggedIn(false); // Set isLoggedIn to false
  console.log('Logout successful');
  console.log('Is someone logged in?', isLoggedIn); 
};
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={createAccountUsername} onChange={(e) => setCreateAccountUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={createAccountPassword} onChange={(e) => setCreateAccountPassword(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Premium:
          <input type="checkbox" checked={premium} onChange={(e) => setPremium(e.target.checked)} />
        </label>
        <input type="submit" value="Sign up" />
      </form>
  
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        </label>
        <input type="submit" value="Login" />  <button onClick={handleLogout}>Logout</button>
      </form>
     
    </div>
  
  );
};
  export default Login;