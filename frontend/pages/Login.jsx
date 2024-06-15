import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [showReg, setShowReg] = useState(false);
  const [regData, setRegData] = useState({ name: "", email: "", password: "" });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    console.log(regData);
    setShowReg(false);
  };

  return (
    <div className="login-container">
      <h2>{showReg ? 'Register' : 'Login'}</h2>
      {showReg ? (
        <form onSubmit={handleRegSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={regData.name}
            onChange={(e) => setRegData({ ...regData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={regData.email}
            onChange={(e) => setRegData({ ...regData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={regData.password}
            onChange={(e) => setRegData({ ...regData, password: e.target.value })}
          />
          <button type="submit">Register</button>
          <p onClick={() => setShowReg(false)}>Already have an account? Login</p>
        </form>
      ) : (
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
          <button type="submit">Login</button>
          <p onClick={() => setShowReg(true)}>Create Account...</p>
        </form>
      )}
    </div>
  );
};

export default Login;
