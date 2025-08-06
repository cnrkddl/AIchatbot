// frontend/src/routes/Router.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage        from '../pages/HomePage';
import ChatBotPage     from '../pages/ChatBotPage';
import FeedbackPage    from '../pages/FeedbackPage';
import PatientInfoPage from '../pages/PatientInfoPage';
import LoginPage       from '../pages/LoginPage';

const Router = () => (
  <BrowserRouter>
    <Routes>
      {/* 기본 경로는 /home으로 리다이렉트 */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/home"          element={<HomePage />} />
      <Route path="/chatbot"       element={<ChatBotPage />} />
      <Route path="/feedback"      element={<FeedbackPage />} />
      <Route path="/patient-info"  element={<PatientInfoPage />} />
      <Route path="/login"         element={<LoginPage />} />

      {/* 정의되지 않은 모든 경로 → /home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
