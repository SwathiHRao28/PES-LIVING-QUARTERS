import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadPage.css';

const UploadLaundrySchedule = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedLaundrySchedule = localStorage.getItem('laundrySchedule');
        if (storedLaundrySchedule) {
            setUploadedImage(storedLaundrySchedule);
        }
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);
            localStorage.setItem('laundrySchedule', fileURL);
            setUploadedImage(fileURL);
            setSelectedFile(null);
            alert('Laundry schedule uploaded successfully!');
        }
    };

    const handleGoBack = () => {
        navigate('/admin-dashboard');
    };

    return (
        <div className="upload-page-container">
            <h2>Upload Laundry Schedule</h2>
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
                    <img src={uploadedImage} alt="Uploaded Laundry Schedule" className="uploaded-image" />
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

export default UploadLaundrySchedule;
