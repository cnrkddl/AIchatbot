// src/App.js
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import LoginPage       from './pages/LoginPage';
import HomePage        from './pages/HomePage';
import ChatBotPage     from './pages/ChatBotPage';
import PatientInfoPage from './pages/PatientInfoPage';
import FeedbackPage    from './pages/FeedbackPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* 로그인 전: 모든 경로는 LoginPage */}
        {!isLoggedIn && (
          <Route
            path="/*"
            element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
        )}

        {/* 로그인 후에만 접근 가능 */}
        {isLoggedIn && (
          <>
            <Route path="/"         element={<HomePage />} />
            <Route path="/chat"     element={<ChatBotPage />} />
            <Route path="/patient"  element={<PatientInfoPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            {/* 잘못된 주소는 홈으로 */}
            <Route path="*"         element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
