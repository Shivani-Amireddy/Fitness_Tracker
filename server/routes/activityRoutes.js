const express = require('express');
const { logActivity, getActivityLogs, updateActivityLog, deleteActivityLog } = require('../controllers/activityController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/log', authMiddleware, logActivity);
router.get('/logs', authMiddleware, getActivityLogs);
router.put('/log', authMiddleware, updateActivityLog);
router.delete('/log/:id', authMiddleware, deleteActivityLog);

module.exports = router;
