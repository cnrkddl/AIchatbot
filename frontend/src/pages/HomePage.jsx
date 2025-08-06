import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* 공통 Header */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main style={styles.main}>
        <h1 style={styles.title}>안녕하세요, 보호자님</h1>
        <p style={styles.subtitle}>무엇을 도와드릴까요?</p>
        <div style={styles.cardContainer}>
          <div style={styles.card} onClick={() => navigate('/chat')}>
            <div style={styles.cardIcon}>💬</div>
            <div style={styles.cardText}>챗봇 질문하기</div>
          </div>
          <div style={styles.card} onClick={() => navigate('/patient')}>
            <div style={styles.cardIcon}>🧑‍⚕️</div>
            <div style={styles.cardText}>환자 정보 보기</div>
          </div>
          <div style={styles.card} onClick={() => navigate('/feedback')}>
            <div style={styles.cardIcon}>📝</div>
            <div style={styles.cardText}>고객 평가 남기기</div>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  page: {
    background: '#ffffff',
    color: '#333',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#222',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '40px',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '20px',
    maxWidth: '600px',
    width: '100%',
  },
  card: {
    background: '#f9f9f9',
    border: '1px solid #eaeaea',
    borderRadius: '16px',
    padding: '30px 20px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  cardIcon: {
    fontSize: '32px',
    marginBottom: '12px',
  },
  cardText: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
  },
};

export default HomePage;
