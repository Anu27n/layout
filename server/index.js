const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const layoutRoutes = require('./routes/layoutRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Enhanced MongoDB connection logging
console.log('Attempting to connect to MongoDB...');
console.log('URI:', process.env.MONGO_URI ? 'URI is set' : 'URI is missing');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => {
        console.error('Could not connect to MongoDB:', err.message);
        console.error('Full error details:', err);
    });

app.use('/api/layouts', layoutRoutes);

app.get('/', (req, res) => {
    res.send('Layout API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
