import React, { useState } from 'react';
import FAQModal from '../components/FAQModal';

const ChatBotPage = () => {
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  const toggleFAQ = () => setIsFAQOpen(prev => !prev);

  return (
    <div style={{ padding: '20px' }}>
      <h2>챗봇 질문하기</h2>

      {/* 챗봇 들어올 공간 */}
      <div style={{ border: '1px solid #ccc', padding: '20px', height: '200px' }}>
        <p>챗봇 만들어지면 연결해야지~ </p> {/* ← 이 부분을 나중에 state로 관리하면 됨 / useState + fetch로 챗봇 응답 받아오기*/}
      </div>

    
      {/* FAQ 버튼 */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={toggleFAQ}>FAQ 보기</button>
      </div>

      {/* FAQ 모달 */}
      {isFAQOpen && <FAQModal onClose={toggleFAQ} />}
    </div>
  );
};

export default ChatBotPage;
