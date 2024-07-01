import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from "./utils/Themes";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './pages/Dashboard';
import Navbar from "./components/Navbar";
import { AuthProvider } from './context/AuthContext';
import FoodLogging from "./components/FoodLogging";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <AuthProvider>
        <Router>
          <Navbar />  {/* Place Navbar here */}
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/food-logging" element={<FoodLogging />} />

          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
