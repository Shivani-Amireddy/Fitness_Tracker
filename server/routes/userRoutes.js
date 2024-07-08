const express = require('express');
const router = express.Router();
const { signUp, signIn, getProfile, updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
