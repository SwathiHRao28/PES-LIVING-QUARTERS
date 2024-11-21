import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
    const navigate = useNavigate();
    const [fadeOutLeft, setFadeOutLeft] = useState(false);

    const handleLoginClick = () => {
        setFadeOutLeft(true);
        setTimeout(() => {
            navigate('/login');
        }, 500); // Match the CSS transition duration
    };

    return (
        <div className={`welcome-container ${fadeOutLeft ? 'fade-out-left' : ''}`}>
            {/* Left Section (Image/Design) */}
            <div className="image-container">
                
                {/* Add an image or content inside this section */}
            </div>
            {/* Right Section (Welcome Text) */}
            <div className="welcome-container-left">
                <h1>Welcome to PES Living Quarters</h1>
                <p>Home away from home!</p>
                <button className="login-button" onClick={handleLoginClick}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;
