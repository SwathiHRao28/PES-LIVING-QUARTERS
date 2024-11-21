// /backend/routes/mealPreferencesRoutes.js
const express = require('express');
const MealPreferences = require('../models/mealPreferencesModel');
const MealCounts = require('../models/mealCountsModel');

const router = express.Router();

// POST request to submit meal preferences
router.post('/', async (req, res) => {
    const { studentId, breakfast, lunch, snacks, dinner } = req.body;
    
    // Update or create the student's meal preferences
    let preferences = await MealPreferences.findOne({ studentId });
    if (!preferences) {
        preferences = new MealPreferences({ studentId, breakfast, lunch, snacks, dinner });
    } else {
        preferences.breakfast = breakfast;
        preferences.lunch = lunch;
        preferences.snacks = snacks;
        preferences.dinner = dinner;
    }
    await preferences.save();

    // Update meal counts
    const counts = await MealCounts.findOne({});
    if (counts) {
        if (breakfast === 'Yes') counts.breakfastYes += 1;
        if (breakfast === 'No') counts.breakfastNo += 1;
        if (lunch === 'Yes') counts.lunchYes += 1;
        if (lunch === 'No') counts.lunchNo += 1;
        if (snacks === 'Yes') counts.snacksYes += 1;
        if (snacks === 'No') counts.snacksNo += 1;
        if (dinner === 'Yes') counts.dinnerYes += 1;
        if (dinner === 'No') counts.dinnerNo += 1;

        await counts.save();
    }

    res.send('Meal preferences submitted successfully!');
});

module.exports = router;
