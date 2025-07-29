import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ChatBotPage from '../pages/ChatBotPage';
import PatientInfoPage from '../pages/PatientInfoPage';
import FeedbackPage from '../pages/FeedbackPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/patient" element={<PatientInfoPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
