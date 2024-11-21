import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadPage.css';

const UploadAnnouncements = () => {
    const [announcement, setAnnouncement] = useState('');
    const [announcementList, setAnnouncementList] = useState([]);
    const navigate = useNavigate();

    // Load announcements from localStorage on component mount
    useEffect(() => {
        const storedAnnouncements = JSON.parse(localStorage.getItem('announcements')) || [];
        setAnnouncementList(storedAnnouncements);
    }, []);

    // Handle adding a new announcement
    const handleAddAnnouncement = () => {
        if (announcement.trim() !== '') {
            const updatedList = [...announcementList, announcement];
            setAnnouncementList(updatedList);
            localStorage.setItem('announcements', JSON.stringify(updatedList));
            setAnnouncement('');  // Clear input field after adding
            alert('Announcement added successfully!');
        }
    };

    // Handle deleting an announcement
    const handleDeleteAnnouncement = (index) => {
        const updatedList = announcementList.filter((_, i) => i !== index);
        setAnnouncementList(updatedList);
        localStorage.setItem('announcements', JSON.stringify(updatedList));
        alert('Announcement deleted successfully!');
    };

    return (
        <div className="upload-page-container">
            <h2>Upload Announcements</h2>
            <div className="upload-section">
                <input
                    type="text"
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    placeholder="Enter your announcement here..."
                />
                <button onClick={handleAddAnnouncement}>Add Announcement</button>
            </div>

            <div className="announcement-display">
                <h3>Existing Announcements:</h3>
                {announcementList.length > 0 ? (
                    <ul>
                        {announcementList.map((ann, index) => (
                            <li key={index} style={{ color: 'black' }}> {/* Inline style for black text */}
                                {ann}
                                <button
                                    onClick={() => handleDeleteAnnouncement(index)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No announcements yet.</p>
                )}
            </div>

            <button onClick={() => navigate('/admin-dashboard')} className="go-back-button">
                Go Back to Dashboard
            </button>
        </div>
    );
};

export default UploadAnnouncements;
