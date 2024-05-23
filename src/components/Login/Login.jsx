/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { LoginCss } from './Login.css.jsx';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [createAccountUsername, setCreateAccountUsername] = useState('');
  const [createAccountPassword, setCreateAccountPassword] = useState('');
  const [email, setEmail] = useState('');
  const [premium, setPremium] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();

     const response = await fetch('https://staffoji-game-6d75a67b1765.onrender.com/user/', {
    //TODO: change to the following line when deploying 
    // //  const response = await fetch('http://localhost:8083/user/', {
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
      console.log('Sign in successful');
    } else {
      const errorData = await response.json();
      console.error('Sign in failed:', errorData.message);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

     const response = await fetch('https://staffoji-game-6d75a67b1765.onrender.com/user/login', {
    //  const response = await fetch('http://localhost:8083/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: loginUsername, password: loginPassword }),
    });

    if (response.ok) {
      console.log('Login successful');
      localStorage.setItem('username', loginUsername); // Store username in localStorage
      setIsLoggedIn(true);
    } else {
      console.error('Login failed');
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('username');

    if (username) {
      console.log(`Welcome back, ${username}!`);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username'); // Remove username from localStorage
    setIsLoggedIn(false); // Set isLoggedIn to false
    console.log('Logout successful');
  };

  return (
    <div css={LoginCss} className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Sign In</h2>
          <form onSubmit={handleSignIn}>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input type="text" className="form-control" value={createAccountUsername} onChange={(e) => setCreateAccountUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input type="password" className="form-control" value={createAccountPassword} onChange={(e) => setCreateAccountPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="premium" checked={premium} onChange={(e) => setPremium(e.target.checked)} />
              <label className="form-check-label" htmlFor="premium">Premium</label>
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
          </form>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Log In</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input type="text" className="form-control" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input type="password" className="form-control" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary me-2">Login</button>
            <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
// TODO: SAVE LOGGED IN USER IN SESSIONS (COOKIE)
// TODO: HIDE SIGN IN BUTTON. MAKE A BUTTON "DO NOT HAVE AN ACCOUNT?" IT WILL OPEN SIGN IN FORMULAR