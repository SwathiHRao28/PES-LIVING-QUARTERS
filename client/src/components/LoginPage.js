import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import 'font-awesome/css/font-awesome.min.css';  // Import Font Awesome

const LoginPage = () => {
    const navigate = useNavigate();
    const [fadeInRight, setFadeInRight] = useState(false);

    useEffect(() => {
        setFadeInRight(true);
    }, []);

    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please enter both Hostel ID and password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hostel_id: username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate(role === 'Student' ? '/student-dashboard' : '/admin-dashboard');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className={`login-page ${fadeInRight ? 'fade-in-right' : ''}`}>
            {/* Left Section */}
            <div className="login-container">
            <i className="fa fa-user"></i>
                <h1 className="login-header">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="role">Select Role:</label>
                        <select id="role" value={role} onChange={handleRoleChange}>
                            <option value="">Select</option>
                            <option value="Student">Student</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="username">
                            Hostel ID:  {/* faUser Icon */}
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your Hostel ID"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>

            {/* Right Section */}
            <div className="image-container">
                <img src="/logo.jpeg" alt="Decorative" />
            </div>
        </div>
    );
};

export default LoginPage;
