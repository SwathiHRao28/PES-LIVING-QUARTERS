import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ContactInfoPage.css';

const ContactInfoPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine source (admin or student) from navigation state
    const source = location.state?.source || 'student';

    const goBackToDashboard = () => {
        if (source === 'admin') {
            navigate('/admin-dashboard');
        } else {
            navigate('/student-dashboard');
        }
    };

    return (
        <div className="contact-info-container">
            <h2 className="contact-info-heading">Contact Info</h2>
            <div className="contact-details">
                <ol>
                    <li>
                        <strong>Manager of PES Living Quarters:</strong>
                        <ul>
                            <li>Phone: +91 9800980098</li>
                            <li>Email: binod@gmail.com</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Unit 1:</strong>
                        <ul>
                            <li>Warden: +91 9191929293</li>
                            <li>Security Guard: +91 9757208890</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Unit 2:</strong>
                        <ul>
                            <li>Warden: +91 8765432109</li>
                            <li>Security Guard: +91 7755678890</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Unit 3:</strong>
                        <ul>
                            <li>Warden: +91 6789678900</li>
                            <li>Security Guard: +91 7254678890</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Emergency Contact:</strong>
                        <ul>
                            <li>Phone: +91 9000900090</li>
                        </ul>
                    </li>
                    <li>
                        <strong>General Inquiries:</strong>
                        <ul>
                            <li>Email: info@peslivingquarters.com</li>
                        </ul>
                    </li>
                </ol>
            </div>
            <button onClick={goBackToDashboard} className="back-to-dashboard-button">
                Back to Dashboard
            </button>
        </div>
    );
};

export default ContactInfoPage;
