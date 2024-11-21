// models/MealPreference.js
const mongoose = require('mongoose');

const MealPreferenceSchema = new mongoose.Schema({
    studentId: { type: String, required: true }, // To identify the student (e.g., email or ID)
    breakfast: { type: String, enum: ["Yes", "No"], required: true },
    lunch: { type: String, enum: ["Yes", "No"], required: true },
    lunchPlace: { type: String, enum: ["Hostel", "College Mess"], required: false },
    lunchType: { type: String, enum: ["Veg", "Non-Veg"], required: false },
    snacks: { type: String, enum: ["Yes", "No"], required: true },
    dinner: { type: String, enum: ["Yes", "No"], required: true },
    dinnerType: { type: String, enum: ["Veg", "Non-Veg"], required: false }
}, { timestamps: true });

module.exports = mongoose.model('MealPreference', MealPreferenceSchema);
