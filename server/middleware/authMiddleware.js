const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ error: 'Authorization denied, user not found' });
    }
    next();
  } catch (error) {
    console.error('Token error:', error);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
