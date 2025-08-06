// src/components/Header.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header({ onFAQClick }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isChatPage = pathname === '/chat';

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      padding: '0 1rem',
      borderBottom: '1px solid #ddd',
      background: '#fff',
      boxSizing: 'border-box',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h1
        style={{
          margin: 0,
          fontSize: '1.25rem',
          cursor: 'pointer',
          fontWeight: 600,
          color: '#333'
        }}
        onClick={() => navigate('/')}
      >
        AI Care
      </h1>

      {isChatPage ? (
        <button
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: 'none',
            background: '#f5f5f5',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: '#333'
          }}
          onClick={onFAQClick}
          aria-label="FAQ"
        >
          ?
        </button>
      ) : (
        <div style={{ width: 32, height: 32 }} />
      )}
    </header>
  );
}
