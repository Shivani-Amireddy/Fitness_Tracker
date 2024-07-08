const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Controller for user sign-up
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
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
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Sign-in successful', token });
  } catch (error) {
    console.error('Error in sign-in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for getting user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.userId; 
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getting profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for updating user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; 
    const { name, email, password } = req.body;

    const updateData = { name, email };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error in updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { signUp, signIn, getProfile, updateProfile };
