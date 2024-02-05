const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// ^^ Models
const User = require('./models/User');   


const app = express();

const PORT = process.env.PORT || 3001; 
const MONGODB_URI = process.env.MONGODB_URI;


app.use(express.json()); 
app.use(cors()); // Pour activer CORS

// MongoDB Connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email ) {
            return res.status(400).send('Name, email, and password are required.');
        }

        const newUser = new User({ name, email }); 
        await newUser.save(); 

        res.status(201).send(newUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
