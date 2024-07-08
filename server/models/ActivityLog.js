const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activityType: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  intensity: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
