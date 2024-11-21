const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hostel', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Define a simple schema for login
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
});

const User = mongoose.model('User', userSchema);

// Login API
app.post('/login', async (req, res) => {
    const { username, password, role } = req.body;

    const user = await User.findOne({ username, role });
    if (!user) {
        return res.status(400).json({ message: 'User not found or wrong role' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', username: user.username });
});

// Start server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
