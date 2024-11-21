import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './RulesPage.css';

const RulesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine source (admin or student) from navigation state
    const source = location.state?.source || 'student';

    // Handle navigation back to the dashboard
    const goBackToDashboard = () => {
        if (source === 'admin') {
            navigate('/admin-dashboard');
        } else {
            navigate('/student-dashboard');
        }
    };

    return (
        <div>
            <h2 className="rules-heading">HOSTEL RULES</h2>
            <ol className="rules-list">
                <li>Students shouldn't leave hostel premises before 7am and after 7pm.</li>
                <li>Students must remain on hostel premises between 7:00 AM and 7:00 PM (curfew hours are 8:00 AM to 8:00 PM on Sundays).</li>
                <li>Students must wear their hostel ID cards when exiting and entering the hostel.</li>
                <li>Attendance will be taken daily by the hostel warden at 7:00 PM.</li>
                <li>To visit local guardians or parents, students must submit a permission form signed by their parents 24 hours in advance. This form must also be signed by the warden and the local guardian upon return.</li>
                <li>The possession or consumption of drugs, alcohol, or cigarettes is strictly prohibited.</li>
                <li>Meals must be consumed during the designated times for breakfast, lunch, snacks, and dinner.</li>
                <li>The use of electrical gadgets such as fans, irons, and electric cookers is prohibited.</li>
                <li>Students must be in their rooms by 10:00 PM and are not allowed to leave afterward.</li>
                <li>Online and food orders are not allowed after 8:00 PM.</li>
                <li>Students must avoid causing any disturbance or nuisance to others.</li>
                <li>Any damage to hostel property will incur a fine, for which the responsible student will be liable.</li>
                <li>We firmly require all students to strictly adhere to the following rules, as non-compliance will not be tolerated and excuses will only be considered in genuine emergency situations.</li>
            </ol>

            <button onClick={goBackToDashboard} className="back-to-dashboard-button">
                Back to Dashboard
            </button>
        </div>
    );
};

export default RulesPage;
