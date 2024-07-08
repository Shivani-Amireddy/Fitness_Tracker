const FoodLog = require('../models/FoodLog');

const logFood = async (req, res) => {
  try {
    const { foodName, calories } = req.body;
    const userId = req.userId;
    const date = new Date().toISOString().split('T')[0];

    const foodLog = new FoodLog({ userId, foodName, calories, date });
    await foodLog.save();

    res.status(201).json(foodLog);
  } catch (error) {
    console.error('Error logging food:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFoodLogs = async (req, res) => {
  try {
    const userId = req.userId;
    const foodLogs = await FoodLog.find({ userId }).sort({ date: -1 });

    res.status(200).json(foodLogs);
  } catch (error) {
    console.error('Error fetching food logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateFoodLog = async (req, res) => {
  try {
    const { id, foodName, calories } = req.body;

    const updatedFoodLog = await FoodLog.findByIdAndUpdate(
      id,
      { foodName, calories },
      { new: true }
    );

    res.status(200).json(updatedFoodLog);
  } catch (error) {
    console.error('Error updating food log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteFoodLog = async (req, res) => {
  try {
    const { id } = req.params;

    await FoodLog.findByIdAndDelete(id);

    res.status(200).json({ message: 'Food log deleted successfully' });
  } catch (error) {
    console.error('Error deleting food log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { logFood, getFoodLogs, updateFoodLog, deleteFoodLog };
