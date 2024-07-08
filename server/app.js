const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const userRoutes = require('./routes/userRoutes'); // Update to use the new routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8082;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

app.use('/api/user', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
