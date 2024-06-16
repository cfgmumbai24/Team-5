import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [regData, setRegData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e, setData) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e, endpoint, data) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8080/auth/${endpoint}`, data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setMessage(`${endpoint === 'login' ? 'Login' : 'Registration'} successful`);
        if (endpoint === 'login') {
          navigate('/admin'); // navigate to master_admin page on successful login
        } else {
          setIsRegistering(false);
        }
      } else {
        setMessage(response.data.message || `${endpoint === 'login' ? 'Login' : 'Registration'} failed`);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || `An error occurred: ${error.message}`;
      setMessage(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={(e) => handleSubmit(e, isRegistering ? 'register' : 'login', isRegistering ? regData : userData)}>
        {isRegistering && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={regData.name}
            onChange={(e) => handleInputChange(e, setRegData)}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={isRegistering ? regData.email : userData.email}
          onChange={(e) => handleInputChange(e, isRegistering ? setRegData : setUserData)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={isRegistering ? regData.password : userData.password}
          onChange={(e) => handleInputChange(e, isRegistering ? setRegData : setUserData)}
        />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        <p onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Login' : 'Create Account...'}
        </p>
      </form>
    </div>
  );
};

export default Login;
