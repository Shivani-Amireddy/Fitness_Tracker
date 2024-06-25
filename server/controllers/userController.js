const User = require('../models/User'); // Assuming you have a User model defined

// Controller for user sign-up
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in sign-up:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for user sign-in
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // You can generate a JWT token here and send it in the response if needed
    res.status(200).json({ message: 'Sign-in successful' });
  } catch (error) {
    console.error('Error in sign-in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { signUp, signIn };
