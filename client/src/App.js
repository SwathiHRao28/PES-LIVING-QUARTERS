import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import RulesPage from './components/RulesPage';
import ContactInfoPage from './components/ContactInfoPage';
import MealSelectionPage from './components/MealSelectionPage';
import BusSchedulePage from './components/BusSchedulePage';
import WashingSchedulePage from './components/WashingSchedulePage';
import UploadBusSchedule from './components/UploadBusSchedule';
import UploadLaundrySchedule from './components/UploadLaundrySchedule';
import UploadAnnouncements from './components/UploadAnnouncements';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/rules" element={<RulesPage />} />
                <Route path="/contact-info" element={<ContactInfoPage />} />
                <Route path="/meal-selection" element={<MealSelectionPage />} />
                <Route path="/bus-schedule" element={<BusSchedulePage />} />
                <Route path="/washing-schedule" element={<WashingSchedulePage />} />
                <Route path="/upload-bus-schedule" element={<UploadBusSchedule />} />
                <Route path="/upload-laundry-schedule" element={<UploadLaundrySchedule />} />
                <Route path="/upload-announcements" element={<UploadAnnouncements />} />
            </Routes>
        </Router>
    );
}

export default App;
