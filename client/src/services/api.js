// src/services/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',  // Your backend server URL
});

// Function to submit meal preferences
export const submitMealPreferences = async (mealData) => {
    try {
        const response = await API.post('/meal-preferences', mealData);
        return response.data;
    } catch (error) {
        console.error('Error submitting meal preferences:', error);
        throw error;
    }
};

// Function to get meal counts (for the admin dashboard)
export const getMealCounts = async () => {
    try {
        const response = await API.get('/meal-counts');
        return response.data;
    } catch (error) {
        console.error('Error fetching meal counts:', error);
        throw error;
    }
};

export default API;
