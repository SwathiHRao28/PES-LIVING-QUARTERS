import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './BusSchedulePage.css';

const BusSchedulePage = () => {
    const [busSchedule, setBusSchedule] = useState(null);
    const navigate = useNavigate(); // Create navigate function

    useEffect(() => {
        // Retrieve the bus schedule from local storage whenever this page is rendered
        const storedBusSchedule = localStorage.getItem('busSchedule');
        setBusSchedule(storedBusSchedule);
    }, []); // Empty dependency array ensures this runs once on initial render

    // Function to handle going back to the student dashboard
    const handleGoBack = () => {
        navigate('/student-dashboard'); // Change '/student-dashboard' to the correct route of your student dashboard
    };

    return (
        <div className="bus-schedule-page">
            <h2>Bus Schedule</h2>
            {busSchedule ? (
                <img
                    src={busSchedule}
                    alt="Bus Schedule"
                    className="bus-schedule-image"
                />
            ) : (
                <p>No bus schedule uploaded yet.</p>
            )}

            {/* Button to navigate back to student dashboard */}
            <button
                className="go-back-button"
                onClick={handleGoBack}
            >
                Go Back to Student Dashboard
            </button>
        </div>
    );
};

export default BusSchedulePage;
