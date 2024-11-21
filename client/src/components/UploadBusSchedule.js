import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadPage.css';

const UploadBusSchedule = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const navigate = useNavigate();

    // Load the bus schedule image from localStorage when the component mounts
    useEffect(() => {
        const storedBusSchedule = localStorage.getItem('busSchedule');
        if (storedBusSchedule) {
            setUploadedImage(storedBusSchedule); // Load the saved image URL from localStorage
        }
    }, []);

    // Handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Handle file upload
    const handleUpload = () => {
        if (selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);
            // Save the image URL to localStorage
            localStorage.setItem('busSchedule', fileURL);
            setUploadedImage(fileURL);  // Store the uploaded image URL
            setSelectedFile(null);  // Clear the file input after upload
            alert("Bus schedule uploaded successfully!");
        }
    };

    // Navigate back to Admin Dashboard
    const handleGoBack = () => {
        navigate('/admin-dashboard');
    };

    // View uploaded image (viewing logic can be added if needed)
    const handleViewBusSchedule = () => {
        const storedBusSchedule = localStorage.getItem('busSchedule');
        setUploadedImage(storedBusSchedule);
    };

    return (
        <div className="upload-page-container">
            <h2>Upload Bus Schedule</h2>
            <div className="upload-section">
                <input
                    type="file"
                    onChange={handleFileChange}
                />
                <button
                    onClick={handleUpload}
                    disabled={!selectedFile}
                >
                    Upload
                </button>
            </div>

            {uploadedImage && (
                <div className="image-display-section">
                    <img src={uploadedImage} alt="Uploaded Bus Schedule" className="uploaded-image" />
                </div>
            )}

            <button
                className="view-button"
                onClick={handleGoBack}
            >
                Go Back to Dashboard
            </button>
        </div>
    );
};

export default UploadBusSchedule;
