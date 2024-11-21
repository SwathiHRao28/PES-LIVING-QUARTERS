// /backend/routes/mealCountsRoutes.js
const express = require('express');
const MealCounts = require('../models/mealCountsModel');

const router = express.Router();

// GET request to fetch meal counts
router.get('/', async (req, res) => {
    const counts = await MealCounts.findOne({});
    res.json(counts);
});

module.exports = router;
