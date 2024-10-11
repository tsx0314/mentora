import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import MatchingPage from './pages/MatchingPage';
import ResourcePage from './pages/ResourcePage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/resources" element={<ResourcePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
