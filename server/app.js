const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
const activityRoutes = require('./routes/activityRoutes');

const app = express();
const port = process.env.PORT || 8082;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// CORS middleware configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Replace with your frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/activity', activityRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
