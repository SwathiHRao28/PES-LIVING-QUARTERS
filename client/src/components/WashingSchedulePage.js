import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WashingSchedulePage.css';

const WashingSchedulePage = () => {
    const [laundrySchedule, setLaundrySchedule] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedLaundrySchedule = localStorage.getItem('laundrySchedule');
        if (storedLaundrySchedule) {
            setLaundrySchedule(storedLaundrySchedule); // Set the retrieved image URL
        }
    }, []);

    const handleGoBack = () => {
        navigate('/student-dashboard');
    };

    return (
        <div className="laundry-schedule-page">
            <h2>Laundry Schedule</h2>
            {laundrySchedule ? (
                <img
                    src={laundrySchedule}
                    alt="Laundry Schedule"
                    className="laundry-schedule-image"
                />
            ) : (
                <p>No laundry schedule uploaded yet.</p>
            )}

            <button
                className="go-back-button"
                onClick={handleGoBack}
            >
                Go Back to Student Dashboard
            </button>
        </div>
    );
};

export default WashingSchedulePage;
