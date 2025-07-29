import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // 임시 로그인 처리
    if (id === 'admin' && pw === '1234') {
      navigate('/home');
    } else {
      alert('아이디 또는 비밀번호가 틀렸습니다');
    }
  };

  return (
    <div>
      <input
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default LoginForm;
