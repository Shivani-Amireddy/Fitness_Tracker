import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from "./utils/Themes";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Navbar from "./components/Navbar";
import { AuthProvider } from './context/AuthContext';
import FoodLogging from "./components/FoodLogging";
import PhysicalActivityLogging from './components/PhysicalActivityLogging';
import Recommendations from './components/Recommendations';
import WaterIntakeTracker from './components/WaterIntakeTracker';
import SleepGoals from './components/SleepGoals';
import EditProfile from './components/Profile';
import Achievement from './components/Achievement';

const App = () => {
  const [achievementMetrics, setAchievementMetrics] = useState({
    steps: 0,
    calories: 0,
    distance: '0 km'
    // Add more metrics as needed, with default values
  });

  useEffect(() => {
    setTimeout(() => {
      const metrics = {
        steps: 10000,
        calories: 500,
        distance: '5 km'
        // Add more metrics as needed
      };
      setAchievementMetrics(metrics);
    }, 1000); // Simulate delay for fetching data
  }, []);
  return (
    <ThemeProvider theme={lightTheme}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/food-logging" element={<FoodLogging />} />
            <Route path="/activity-logging" element={<PhysicalActivityLogging />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/water-intake" element={<WaterIntakeTracker />} />
            <Route path="/sleep-tracking" element={<SleepGoals />} />
            <Route path="/social-sharing" element={<Achievement title="Daily Goal Achieved" metrics={achievementMetrics} />} />
            <Route path="/profile" element={<EditProfile />} />

          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
