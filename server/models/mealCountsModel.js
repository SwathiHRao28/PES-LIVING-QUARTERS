// /backend/models/mealCountsModel.js
const mongoose = require('mongoose');

const mealCountsSchema = new mongoose.Schema({
    breakfastYes: { type: Number, default: 0 },
    breakfastNo: { type: Number, default: 0 },
    lunchYes: { type: Number, default: 0 },
    lunchNo: { type: Number, default: 0 },
    snacksYes: { type: Number, default: 0 },
    snacksNo: { type: Number, default: 0 },
    dinnerYes: { type: Number, default: 0 },
    dinnerNo: { type: Number, default: 0 },
});

const MealCounts = mongoose.model('MealCounts', mealCountsSchema);
module.exports = MealCounts;
