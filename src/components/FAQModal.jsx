import React, { useState } from 'react';

const faqData = [
  {
    question: '면회 시간은 언제인가요?',
    answer: '오전 9시부터 오후 6시까지입니다.',
  },
  {
    question: '보호자는 어떤 정보를 볼 수 있나요?',
    answer: '기본적인 환자 상태, 식단, 복약 정보 등을 볼 수 있습니다.',
  },
  {
    question: '챗봇은 몇 시까지 이용 가능한가요?',
    answer: '24시간 언제든지 질문하실 수 있습니다.',
  }
];

const FAQModal = ({ onClose }) => {
  const [openStates, setOpenStates] = useState(Array(faqData.length).fill(false));

  const toggle = (index) => {
    const updated = [...openStates];
    updated[index] = !updated[index];
    setOpenStates(updated);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#fff', padding: '20px', borderRadius: '12px',
        width: '420px', maxHeight: '80vh', overflowY: 'auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}>
        <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>📋 자주 묻는 질문</h3>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {faqData.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '10px' }}>
              <button
                onClick={() => toggle(idx)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  background: '#f9f9f9',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#eee'}
                onMouseOut={(e) => e.currentTarget.style.background = '#f9f9f9'}
              >
                {item.question}
                <span>{openStates[idx] ? '▲' : '▼'}</span>
              </button>
              {openStates[idx] && (
                <div style={{
                  padding: '10px 16px',
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderTop: 'none',
                  borderRadius: '0 0 6px 6px',
                  animation: 'fadeIn 0.2s ease-in-out'
                }}>
                  {item.answer}
                </div>
              )}
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          style={{
            marginTop: '20px',
            backgroundColor: '#444',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default FAQModal;
