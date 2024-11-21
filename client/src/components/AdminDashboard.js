import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMealCounts } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faSoap, faUser } from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [username] = useState('Admin123');
    const [todaySpecial, setTodaySpecial] = useState('');
    const [mealCounts, setMealCounts] = useState(null);
    const [viewCount, setViewCount] = useState(false);
    const navigate = useNavigate();

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    // Handle logout
    const handleLogout = () => {
        navigate('/');
    };

    // Save "Today's Special" to localStorage
    const saveTodaySpecial = () => {
        localStorage.setItem('todaySpecial', todaySpecial);
        alert("Today's Special has been updated!");
    };

    // Fetch meal counts on component mount
    useEffect(() => {
        const fetchMealCounts = async () => {
            try {
                const counts = await getMealCounts();
                setMealCounts(counts);
            } catch (error) {
                console.error('Failed to fetch meal counts:', error);
            }
        };

        fetchMealCounts();
    }, []);

    return (
        <div className="admin-dashboard-container">
            {/* Announcement Bar */}
            <div className="announcement-bar">
                <marquee behavior="scroll" direction="left" scrollamount="5">
                    Admin Notice: Please upload the latest schedules for buses and laundry.
                </marquee>
            </div>

            {/* Sidebar Toggle */}
            <div className="hamburger-icon" onClick={toggleSidebar}>
                &#9776;
            </div>

            {/* Sidebar */}
            <div className={`side-navbar ${sidebarVisible ? 'visible' : ''}`}>
                <div className="profile-info">
                <FontAwesomeIcon
                        icon={faUser}
                        size="4x"
                        className="profile-icon"
                        style={{ color: '#666', marginBottom: '10px' }}
                    />
                    <h3 className="username">{username}</h3>
                </div>
                <ul className="navbar-options">
                    <li>
                        <button onClick={() => navigate('/upload-bus-schedule')}>
                        <FontAwesomeIcon icon={faBus} style={{ marginRight: '8px' }} />
                            Upload Bus Schedule
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigate('/upload-laundry-schedule')}>
                        <FontAwesomeIcon icon={faSoap} style={{ marginRight: '8px' }} />
                            Upload Laundry Schedule
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigate('/upload-announcements')}>
                            Upload Announcements
                        </button>
                    </li>
                </ul>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className={`main-content ${sidebarVisible ? 'with-sidebar' : ''}`}>
                <h2>Welcome to Admin Dashboard</h2>
                <p>Manage the hostel schedules, upload images, and monitor student activities.</p>

                {/* Division for Today's Special and Meal Counts Side by Side */}
                <div className="menu-and-counts">
                    {/* Today's Special Section */}
                    <div className="todays-special-section">
                        <h3>Today's Menu</h3>
                        <div className="menu-change-section">
                            <label>
                                Today's Special:
                                <input
                                    type="text"
                                    value={todaySpecial}
                                    onChange={(e) => setTodaySpecial(e.target.value)}
                                />
                            </label>
                            <br />
                            <button onClick={saveTodaySpecial}>Save Today's Special</button>
                        </div>
                    </div>

                    {/* Meal Count Section */}
                    <div className="meal-count-section">
                        <h3>Meal Counts</h3>
                        <button onClick={() => setViewCount(!viewCount)}>
                            {viewCount ? 'Hide Counts' : 'View Counts'}
                        </button>
                        {viewCount && (
                            mealCounts ? (
                                <div className="meal-counts">
                                    <ul>
                                        <li>Breakfast (Yes): {mealCounts.breakfastYes}</li>
                                        <li>Breakfast (No): {mealCounts.breakfastNo}</li>
                                        <li>
                                            Lunch (Yes):
                                            <ul>
                                                <li>Veg: {mealCounts.lunchVeg}</li>
                                                <li>NonVeg: {mealCounts.lunchNonVeg}</li>
                                                <li>Hostel: {mealCounts.lunchHostel}</li>
                                                <li>College: {mealCounts.lunchCollege}</li>
                                            </ul>
                                        </li>
                                        <li>Lunch (No): {mealCounts.lunchNo}</li>
                                        <li>Snacks (Yes): {mealCounts.snacksYes}</li>
                                        <li>Snacks (No): {mealCounts.snacksNo}</li>
                                        <li>
                                            Dinner (Yes):
                                            <ul>
                                                <li>Veg: {mealCounts.dinnerVeg}</li>
                                                <li>NonVeg: {mealCounts.dinnerNonVeg}</li>
                                            </ul>
                                        </li>
                                        <li>Dinner (No): {mealCounts.dinnerNo}</li>
                                    </ul>
                                </div>
                            ) : (
                                <p>Loading meal counts...</p>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="footer">
                <button
                    onClick={() => navigate('/rules', { state: { source: 'admin' } })}
                    className="footer-button"
                >
                    Rules
                </button>
                <button
                    onClick={() => navigate('/contact-info', { state: { source: 'admin' } })}
                    className="footer-button"
                >
                    Contact Information
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
