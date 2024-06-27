import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from "./utils/Themes";
import SignIn from './components/SignIn'; 
import SignUp from './components/SignUp'; 
import Dashboard from './pages/Dashboard'



const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
