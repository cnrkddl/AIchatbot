// src/pages/LoginPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 페이지 진입 시 이미 로그인된 상태면 홈으로 보냄
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/kakao/whoami`, {
          credentials: "include",
        });
        const me = await res.json();
        if (!alive) return;
        if (me?.logged_in) {
          navigate("/home", { replace: true });
        }
      } catch (_) {
        // 네트워크 오류면 그냥 로그인 버튼 보여줌
      }
    })();
    return () => {
      alive = false;
    };
  }, [navigate]);

  const handleKakaoLogin = () => {
    setLoading(true);
    // fetch가 아니라 "페이지 이동"이어야 카카오 화면으로 넘어갑니다.
    window.location.assign(`${API_BASE}/auth/kakao/login`);
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <h2 style={{ margin: 0 }}>로그인</h2>
        <p style={{ color: "#666" }}>카카오로 안전하게 로그인하세요.</p>
        <button
          onClick={handleKakaoLogin}
          style={styles.kakaoBtn}
          disabled={loading}
        >
          {loading ? "카카오 연결 중..." : "카카오로 로그인"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f7f7f9",
    padding: 24,
  },
  card: {
    width: 360,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    padding: 24,
  },
  kakaoBtn: {
    width: "100%",
    height: 48,
    borderRadius: 10,
    border: "1px solid #FEE500",
    background: "#FEE500",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 12,
  },
};