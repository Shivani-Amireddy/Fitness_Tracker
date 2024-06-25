// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 8081;
// const MONGODB_URI = process.env.MONGODB_URI;

// app.use(cors());
// app.use(express.json()); // Middleware to parse JSON bodies

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Failed to connect to MongoDB:', err));

// // Route for user signup
// app.post('/api/user/signup', (req, res) => {
//   // Handle user signup logic here
//   // Example:
//   const { username, email, password } = req.body;
//   // Save user data to MongoDB or perform any other necessary actions
//   res.status(200).json({ message: 'User signed up successfully' });
// });

// // Route for user signin
// app.post('/api/user/signin', (req, res) => {
//   // Handle user signin logic here
//   const { email, password } = req.body;
//   // Perform sign-in logic, e.g., check credentials against database
//   if (email === 'john@example.com' && password === 'password123') {
//     res.status(200).json({ message: 'Sign-in successful', token: 'fake-jwt-token' });
//   } else {
//     res.status(401).json({ message: 'Invalid email or password' });
//   }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Route for user signup
app.post('/api/user/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user', error });
  }
});

// Route for user signin
app.post('/api/user/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Sign-in successful', token: 'fake-jwt-token' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in user', error });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

