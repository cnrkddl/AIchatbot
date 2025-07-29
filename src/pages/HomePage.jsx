import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h2>보호자 메인 화면</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '40px' }}>
        <button style={{ padding: '15px' }} onClick={() => navigate('/chatbot')}>
          챗봇 질문하기
        </button>
        <button style={{ padding: '15px' }} onClick={() => navigate('/patient')}>
          환자 정보 보기
        </button>
        <button style={{ padding: '15px' }} onClick={() => navigate('/feedback')}>
          고객 평가 남기기
        </button>
      </div>
    </div>
  );
};

export default HomePage;
