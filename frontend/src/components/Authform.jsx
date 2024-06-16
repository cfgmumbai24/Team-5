import React, { useState } from 'react';
import './Authform.css';

const AuthForm = ({ onLogin }) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false); // Track if the user is in registration mode

    const handleLogin = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: loginEmail, password: loginPassword })
            });
            const data = await response.json();
            if (response.ok) {
                onLogin(); // Notify parent component about successful login
            } else {
                setLoginError('Invalid email or password');
            }
        } catch (error) {
            setLoginError('Something went wrong');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: registerName, email: registerEmail, password: registerPassword })
            });
            const data = await response.json();
            if (!response.ok) {
                setRegisterError('User already exists');
            }
        } catch (error) {
            setRegisterError('Something went wrong');
        }
    };

    const toggleAuthMode = () => {
        setIsRegistering(!isRegistering);
        setLoginError('');
        setRegisterError('');
    };

    return (
        <div className="auth-container">
            {isRegistering ? (
                <div className="auth-form">
                    <h2>Register</h2>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={registerName} onChange={(e) => setRegisterName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                    </div>
                    <button onClick={handleRegister}>Register</button>
                    {registerError && <div className="error">{registerError}</div>}
                    <p>Already have an account? <span onClick={toggleAuthMode}>Login</span></p>
                </div>
            ) : (
                <div className="auth-form">
                    <h2>Login</h2>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                    </div>
                    <button onClick={handleLogin}>Login</button>
                    {loginError && <div className="error">{loginError}</div>}
                </div>
            )}
        </div>
    );
};

export default AuthForm;