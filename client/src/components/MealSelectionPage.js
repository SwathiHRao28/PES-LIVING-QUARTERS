import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import './MealSelectionPage.css';
import axios from 'axios'; 

const MealSelectionPage = () => {

    const { state } = useLocation();
    const [hostelId, setHostelId] = useState('');  
    const [breakfast, setBreakfast] = useState('');
    const [lunch, setLunch] = useState('');
    const [snacks, setSnacks] = useState('');
    const [dinner, setDinner] = useState('');
    const [lunchPlace, setLunchPlace] = useState('');
    const [lunchType, setLunchType] = useState('');
    const [dinnerType, setDinnerType] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        // Send meal preferences to the server
        axios.post('http://localhost:5000/api/meal-preferences', {
            studentId: hostelId, // Use the hostelId here
            breakfast, 
            lunch, 
            snacks, 
            dinner, 
            lunchPlace, 
            lunchType, 
            dinnerType
        })
        .then(response => {
            alert('Meal preferences for tomorrow have been successfully updated!');
            navigate('/student-dashboard');
        })
        .catch(error => {
            console.error('Error submitting meal preferences:', error);
            alert('There was an issue with your request. Please try again.');
        });
    };

    return (
        <div className="meal-selection-page">
            <h2>Meal Preferences for Tomorrow</h2>
            
            {/* Breakfast Selection */}
            <div className="meal-option">
                <label htmlFor="breakfast">Breakfast:</label>
                <select id="breakfast" value={breakfast} onChange={(e) => setBreakfast(e.target.value)} title="Select your breakfast preference">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            {/* Lunch Selection */}
            <div className="meal-option">
                <label htmlFor="lunch">Lunch:</label>
                <select id="lunch" value={lunch} onChange={(e) => setLunch(e.target.value)} title="Select your lunch preference">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                {lunch === "Yes" && (
                    <div className="sub-options">
                        <label htmlFor="lunchPlace">Where would you prefer to have your lunch?</label>
                        <select id="lunchPlace" value={lunchPlace} onChange={(e) => setLunchPlace(e.target.value)} title="Select lunch location">
                        <option value="">Select</option>
                            <option value="Hostel">Hostel</option>
                            <option value="College Mess">College Mess</option>
                        </select>

                        <label htmlFor="lunchType">Lunch Type:</label>
                        <select id="lunchType" value={lunchType} onChange={(e) => setLunchType(e.target.value)} title="Select lunch type">
                        <option value="">Select</option>
                            <option value="Veg">Veg</option>
                            <option value="Non-Veg">Non-Veg</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Snacks Selection */}
            <div className="meal-option">
                <label htmlFor="snacks">Snacks:</label>
                <select id="snacks" value={snacks} onChange={(e) => setSnacks(e.target.value)} title="Select your snacks preference">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            {/* Dinner Selection */}
            <div className="meal-option">
                <label htmlFor="dinner">Dinner:</label>
                <select id="dinner" value={dinner} onChange={(e) => setDinner(e.target.value)} title="Select your dinner preference">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                {dinner === "Yes" && (
                    <div className="sub-options">
                        <label htmlFor="dinnerType">Dinner Type:</label>
                        <select id="dinnerType" value={dinnerType} onChange={(e) => setDinnerType(e.target.value)} title="Select dinner type">
                        <option value="">Select</option>
                            <option value="Veg">Veg</option>
                            <option value="Non-Veg">Non-Veg</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <button onClick={handleSubmit} className="submit-btn">Submit</button>
        </div>
    );
};

export default MealSelectionPage;
