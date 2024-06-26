import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import FlipCard from './components/FlipCard';

function App() {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/profile" 
            element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />} 
          />
          <Route path="/card" element={<FlipCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
