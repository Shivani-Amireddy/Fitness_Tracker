const ActivityLog = require('../models/ActivityLog');

const logActivity = async (req, res) => {
  try {
    const { activityType, duration, intensity } = req.body;
    const userId = req.userId;
    const date = new Date().toISOString().split('T')[0];

    const activityLog = new ActivityLog({ userId, activityType, duration, intensity, date });
    await activityLog.save();

    res.status(201).json(activityLog);
  } catch (error) {
    console.error('Error logging activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getActivityLogs = async (req, res) => {
  try {
    const userId = req.userId;
    const activityLogs = await ActivityLog.find({ userId }).sort({ date: -1 });

    res.status(200).json(activityLogs);
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateActivityLog = async (req, res) => {
  try {
    const { id, activityType, duration, intensity } = req.body;

    const updatedActivityLog = await ActivityLog.findByIdAndUpdate(
      id,
      { activityType, duration, intensity },
      { new: true }
    );

    res.status(200).json(updatedActivityLog);
  } catch (error) {
    console.error('Error updating activity log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteActivityLog = async (req, res) => {
  try {
    const { id } = req.params;

    await ActivityLog.findByIdAndDelete(id);

    res.status(200).json({ message: 'Activity log deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { logActivity, getActivityLogs, updateActivityLog, deleteActivityLog };
