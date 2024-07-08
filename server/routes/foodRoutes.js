const express = require('express');
const { logFood, getFoodLogs, updateFoodLog, deleteFoodLog } = require('../controllers/foodController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/log', authMiddleware, logFood);
router.get('/logs', authMiddleware, getFoodLogs);
router.put('/log', authMiddleware, updateFoodLog);
router.delete('/log/:id', authMiddleware, deleteFoodLog);

module.exports = router;