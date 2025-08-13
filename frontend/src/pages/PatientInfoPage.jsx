// src/pages/PatientInfoPage.jsx
import React from "react";
import Header from "../components/Header";
import { useNotifications } from "../context/NotificationContext";

export default function PatientInfoPage() {
  const { add } = useNotifications();

  const testAddNotification = () => {
    add({
      title: "환자 특이사항 업데이트",
      message: "[2025-08-13] 새벽 2시 호흡곤란 호소, 산소 2L 공급",
      type: "critical", // info | warning | critical
      source: "테스트",
    });
  };

  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <h2>환자 정보 페이지</h2>
        {/* 테스트 버튼 */}
        <button
          onClick={testAddNotification}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            background: "#111827",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          🚨 테스트 알림 추가
        </button>
      </div>
    </>
  );
}
