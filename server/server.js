const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/login', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Define the schema for login
const loginSchema = new mongoose.Schema({
    hostel_id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const Login = mongoose.model('Login', loginSchema, 'loginpage');

// Authentication function (without bcrypt)
async function authenticateUser(hostel_id, password) {
    try {
        const user = await Login.findOne({ hostel_id });

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        if (user.password === password) {
            return { success: true, message: 'Login successful', user };
        } else {
            return { success: false, message: 'Invalid password' };
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        return { success: false, message: 'Error authenticating user' };
    }
}

// POST route for login
app.post('/login', async (req, res) => {
    const { hostel_id, password } = req.body;

    if (!hostel_id || !password) {
        return res.status(400).json({ message: 'Hostel ID and password are required.' });
    }

    const result = await authenticateUser(hostel_id, password);

    if (result.success) {
        res.status(200).json({ message: result.message, user: result.user });
    } else {
        res.status(400).json({ message: result.message });
    }
});

// Models for meal preferences and counts

// Meal preferences schema
const mealPreferencesSchema = new mongoose.Schema({
    studentId: { type: String, unique: true },
    breakfast: { type: String, enum: ['Yes', 'No'] },
    lunch: { type: String, enum: ['Yes', 'No'] },
    snacks: { type: String, enum: ['Yes', 'No'] },
    dinner: { type: String, enum: ['Yes', 'No'] },
    lunchPlace: { type: String, enum: ['Hostel', 'College Mess'], default: 'Hostel' },
    lunchType: { type: String, enum: ['Veg', 'Non-Veg'], default: 'Veg' },
    dinnerType: { type: String, enum: ['Veg', 'Non-Veg'], default: 'Veg' }
});

const MealPreferences = mongoose.model('MealPreferences', mealPreferencesSchema);

// Meal counts schema
const mealCountsSchema = new mongoose.Schema({
    breakfastYes: { type: Number, default: 0 },
    breakfastNo: { type: Number, default: 0 },
    lunchYes: { type: Number, default: 0 },
    lunchHostel: { type: Number, default: 0 },
    lunchCollege: { type: Number, default: 0 },
    lunchVeg: { type: Number, default: 0 },
    lunchNonVeg: { type: Number, default: 0 },
    lunchNo: { type: Number, default: 0 },
    snacksYes: { type: Number, default: 0 },
    snacksNo: { type: Number, default: 0 },
    dinnerYes: { type: Number, default: 0 },
    dinnerNo: { type: Number, default: 0 },
    dinnerVeg: { type: Number, default: 0 },
    dinnerNonVeg: { type: Number, default: 0 },
});

const MealCounts = mongoose.model('MealCounts', mealCountsSchema);

// Route for submitting meal preferences
app.post('/api/meal-preferences', async (req, res) => {
    const { studentId, breakfast, lunch, snacks, dinner, lunchPlace, lunchType, dinnerType} = req.body;

    try {
        // Validate enum values
        const validLunchPlaces = ['Hostel', 'College Mess'];
        const validMealTypes = ['Veg', 'Non-Veg'];

        // Check if lunchPlace, lunchType, or dinnerType are valid
        if (!validLunchPlaces.includes(lunchPlace)) {
            return res.status(400).json({ message: 'Invalid lunchPlace value.' });
        }
        if (!validMealTypes.includes(lunchType)) {
            return res.status(400).json({ message: 'Invalid lunchType value.' });
        }
        if (!validMealTypes.includes(dinnerType)) {
            return res.status(400).json({ message: 'Invalid dinnerType value.' });
        }

        // Check if the student has already submitted preferences for the day
        let preferences = await MealPreferences.findOne({ studentId });

        if (preferences) {
            // If preferences exist, update them
            preferences.breakfast = breakfast;
            preferences.lunch = lunch;
            preferences.snacks = snacks;
            preferences.dinner = dinner;
            preferences.lunchPlace = lunchPlace;
            preferences.lunchType = lunchType;
            preferences.dinnerType = dinnerType;
            await preferences.save();
        } else {
            // Create new meal preferences if they don't exist
            preferences = new MealPreferences({ 
                studentId, 
                breakfast, 
                lunch, 
                snacks, 
                dinner, 
                lunchPlace, 
                lunchType, 
                dinnerType 
            });
            await preferences.save();
        }

        // Update meal counts
        let counts = await MealCounts.findOne({});
        if (counts) {
            if (breakfast === 'Yes') counts.breakfastYes += 1;
            if (breakfast === 'No') counts.breakfastNo += 1;
            if (lunch === 'Yes') counts.lunchYes += 1;
            if (lunchPlace === 'Hostel') counts.lunchHostel += 1;
            if (lunchPlace === 'College Mess') counts.lunchCollege += 1;
            if (lunchType === 'Veg') counts.lunchVeg += 1;
            if (lunchType === 'Non-Veg') counts.lunchNonVeg += 1;
            if (lunch === 'No') counts.lunchNo += 1;
            if (snacks === 'Yes') counts.snacksYes += 1;
            if (snacks === 'No') counts.snacksNo += 1;
            if (dinner === 'Yes') counts.dinnerYes += 1;
            if (dinner === 'No') counts.dinnerNo += 1;
            if (dinnerType === 'Veg') counts.dinnerVeg += 1;
            if (dinnerType === 'Non-Veg') counts.dinnerNonVeg += 1;

            await counts.save();
        } else {
            // Initialize meal counts if they don't exist
            const newCounts = new MealCounts({
                breakfastYes: breakfast === 'Yes' ? 1 : 0,
                breakfastNo: breakfast === 'No' ? 1 : 0,
                lunchYes: lunch === 'Yes' ? 1 : 0,
                lunchHostel: lunch === 'Hostel' ? 1 : 0,
                lunchCollege: lunch === 'College Mess' ? 1 : 0,
                lunchVeg: lunch === 'Veg' ? 1 : 0,
                lunchNonVeg: lunch === 'Non-Veg' ? 1 : 0,
                lunchNo: lunch === 'No' ? 1 : 0,
                snacksYes: snacks === 'Yes' ? 1 : 0,
                snacksNo: snacks === 'No' ? 1 : 0,
                dinnerYes: dinner === 'Yes' ? 1 : 0,
                dinnerNo: dinner === 'No' ? 1 : 0,
                dinnerVeg: dinnerType === 'Veg' ? 1 : 0,
                dinnerNonVeg: dinnerType === 'Non-Veg' ? 1 : 0,
            });
            await newCounts.save();
        }

        res.status(200).json({ message: 'Meal preferences submitted successfully!' });
    } catch (err) {
        console.error('Error submitting meal preferences:', err);
        res.status(500).json({ message: 'Error submitting meal preferences' });
    }
});


// Route for fetching meal counts for admin
app.get('/api/meal-counts', async (req, res) => {
    try {
        const counts = await MealCounts.findOne({});
        if (!counts) {
            return res.status(404).json({ message: 'Meal counts not found' });
        }
        res.status(200).json(counts);
    } catch (err) {
        console.error('Error fetching meal counts:', err);
        res.status(500).json({ message: 'Error fetching meal counts', error: err.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
