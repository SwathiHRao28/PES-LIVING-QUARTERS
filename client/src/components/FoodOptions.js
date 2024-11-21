// FoodOptions.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FoodOptions = () => {
    const [menu, setMenu] = useState({
        breakfast: '',
        lunch: '',
        dinner: ''
    });
    const navigate = useNavigate();

    // Load today's menu (based on current day)
    useEffect(() => {
        const dayOfWeek = new Date().toLocaleString('en-us', { weekday: 'long' });
        const storedMenu = JSON.parse(localStorage.getItem('menu')) || {};

        setMenu(storedMenu[dayOfWeek] || {
            breakfast: '',
            lunch: '',
            dinner: ''
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMenu(prevMenu => ({
            ...prevMenu,
            [name]: value
        }));
    };

    const saveMenu = () => {
        const dayOfWeek = new Date().toLocaleString('en-us', { weekday: 'long' });
        const storedMenu = JSON.parse(localStorage.getItem('menu')) || {};
        storedMenu[dayOfWeek] = menu;

        localStorage.setItem('menu', JSON.stringify(storedMenu));
        alert('Menu updated successfully!');
    };

    return (
        <div className="food-options-container">
            <h2>Update Menu for Today</h2>
            <div>
                <label>Breakfast:</label>
                <input
                    type="text"
                    name="breakfast"
                    value={menu.breakfast}
                    onChange={handleChange}
                    placeholder="Enter breakfast menu"
                />
            </div>
            <div>
                <label>Lunch:</label>
                <input
                    type="text"
                    name="lunch"
                    value={menu.lunch}
                    onChange={handleChange}
                    placeholder="Enter lunch menu"
                />
            </div>
            <div>
                <label>Dinner:</label>
                <input
                    type="text"
                    name="dinner"
                    value={menu.dinner}
                    onChange={handleChange}
                    placeholder="Enter dinner menu"
                />
            </div>
            <button onClick={saveMenu}>Save Menu</button>
            <button onClick={() => navigate('/admin-dashboard')}>Go Back to Dashboard</button>
        </div>
    );
};

export default FoodOptions;
