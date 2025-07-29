import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>보호자 로그인</h2>
      <input placeholder="아이디" style={{ padding: '10px', margin: '10px' }} /><br />
      <input type="password" placeholder="비밀번호" style={{ padding: '10px', margin: '10px' }} /><br />
      <button onClick={() => navigate('/home')}>로그인</button>
    </div>
  );
};

export default LoginPage;
