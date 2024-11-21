import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faSoap, faUser } from '@fortawesome/free-solid-svg-icons';
import './StudentDashboard.css';
import menuData from './menu.json'; // Import the menu data from menu.json

const StudentDashboard = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [hostelId, setHostelId] = useState('');  // Default hostelId is an empty string
    const [announcements, setAnnouncements] = useState([]);
    const [menu, setMenu] = useState({}); // Store the current day's menu
    const [todaySpecial, setTodaySpecial] = useState(''); // Store "Today's Special"
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove user data on logout
        navigate('/'); // Redirect to login page
    };

    useEffect(() => {
        // Fetching user data from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setHostelId(user.hostel_id);  // Set the hostel ID from the logged-in user
        }

        // Fetching announcements from localStorage
        const storedAnnouncements = JSON.parse(localStorage.getItem('announcements')) || [];
        setAnnouncements(storedAnnouncements);

        // Fetching today's menu from menuData
        const dayOfWeek = new Date().toLocaleString('en-us', { weekday: 'long' }); // Get the current day of the week

        // Find the menu for the current day
        const todayMenu = menuData.find(item => item.day.toLowerCase() === dayOfWeek.toLowerCase());

        if (todayMenu) {
            setMenu(todayMenu); // Set the menu for today
        } else {
            setMenu({ breakfast: '', lunch: '', dinner: '', snacks: '' });
        }

        // Checking for temporary menu changes in localStorage
        const tempMenu = JSON.parse(localStorage.getItem('tempMenu')) || {};
        if (tempMenu[dayOfWeek]) {
            setMenu(tempMenu[dayOfWeek]);  // Override with today's temporary changes if available
        }

        // Fetching "Today's Special" from localStorage
        const special = localStorage.getItem('todaySpecial') || ''; // Get "Today's Special" from localStorage
        setTodaySpecial(special); // Set "Today's Special" in state
    }, []);

    return (
        <div className="dashboard-container">
            {/* Dynamic Announcement Bar */}
            <div className="announcement-bar">
                <marquee behavior="scroll" direction="left" scrollamount="5">
                    {announcements.length > 0
                        ? announcements.join(' | ')
                        : 'Welcome to the Student Dashboard!'}
                </marquee>
            </div>

            {/* Sidebar Toggle Button */}
            <div className="hamburger-icon" onClick={toggleSidebar}>
                &#9776;
            </div>

            {/* Side Navbar */}
            <div className={`side-navbar ${sidebarVisible ? 'visible' : ''}`}>
                <div className="profile-info">
                    <FontAwesomeIcon
                        icon={faUser}
                        size="4x"
                        className="profile-icon"
                        style={{ color: '#666', marginBottom: '10px' }}
                    />
                    <h3 className="username">{hostelId || 'Student'}</h3> {/* Display the hostelId as username */}
                </div>
                <ul className="navbar-options">
                    <li>
                        <button onClick={() => navigate('/bus-schedule')}>
                            <FontAwesomeIcon icon={faBus} style={{ marginRight: '8px' }} />
                            Bus Schedule
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigate('/washing-schedule')}>
                            <FontAwesomeIcon icon={faSoap} style={{ marginRight: '8px' }} />
                            Laundry Schedule
                        </button>
                    </li>
                </ul>

                {/* Logout Button */}
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Main Dashboard Content */}
            <div className={`main-content ${sidebarVisible ? 'with-sidebar' : ''}`}>
                <h2>Welcome to your Dashboard</h2>
                <p>As a student, you can view the latest information here.</p>

                {/* Choose for Tomorrow Button */}
                <button
                    className="choose-for-tomorrow-btn"
                    onClick={() => navigate('/meal-selection', { state: { hostelId } })}
                >
                    Choose  Meal Preference of Tomorrow
                </button>

                {/* Today's Menu Section */}
                <div className="menu-section">
                    <h3>Today's Menu:</h3>
                    {menu.day ? (
                        <div>
                            <p><strong>Breakfast:</strong> {menu.breakfast}</p>
                            <p><strong>Lunch:</strong> {menu.lunch}</p>
                            <p><strong>Snacks:</strong> {menu.snacks}</p>
                            <p><strong>Dinner:</strong> {menu.dinner}</p>
                        </div>
                    ) : (
                        <p>No menu available for today.</p>
                    )}
                </div>

                {/* Today's Special */}
                {todaySpecial && (
                    <div>
                        <h3>Today's Special:</h3>
                        <p>{todaySpecial}</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="footer">
                <button
                    onClick={() => navigate('/rules', { state: { source: 'student' } })}
                    className="footer-button"
                >
                    Rules
                </button>
                <button
                    onClick={() => navigate('/contact-info', { state: { source: 'student' } })}
                    className="footer-button"
                >
                    Contact Information
                </button>
            </div>
        </div>
    );
};

export default StudentDashboard;
