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
      <div style={styles.backgroundDecoration}>
        <div style={styles.circle1}></div>
        <div style={styles.circle2}></div>
        <div style={styles.circle3}></div>
      </div>
      
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <img 
            src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Flh3.googleusercontent.com%2FvIEP7BRkOXpvJCTKH6c_zs78w2CfZer0fSrkkBN_zhYr4WF9o9H5ffJ23IGisjW45w%3Dh500&type=sc960_832"
            alt="효림의료재단 로고"
            style={styles.logo}
          />
        </div>
        
        <div style={styles.content}>
          <h1 style={styles.title}>효림요양병원</h1>
          <h2 style={styles.subtitle}>AI 챗봇 서비스</h2>
          <p style={styles.description}>
            환자 상태 확인부터 상담까지<br />
            언제든 편리하게 이용하세요
          </p>
          
          <button
            onClick={handleKakaoLogin}
            style={styles.kakaoBtn}
            disabled={loading}
          >
            {loading ? (
              <div style={styles.loadingContent}>
                <div style={styles.spinner}></div>
                <span>카카오 연결 중...</span>
              </div>
            ) : (
              <div style={styles.btnContent}>
                <span style={styles.kakaoIcon}>💬</span>
                <span>카카오로 시작하기</span>
              </div>
            )}
          </button>
          
          <div style={styles.features}>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🔒</span>
              <span>안전한 인증</span>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>😊</span>
              <span>친절한 응답</span>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>📱</span>
              <span>쉬운 사용</span>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .card {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
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
    paddingTop: "5vh", // 10vh에서 더 줄여서 위로 올리기
  },
  backgroundDecoration: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: -1,
  },
  circle1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.1)",
    top: "-50px",
    left: "-100px",
  },
  circle2: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.08)",
    bottom: "100px",
    right: "100px",
  },
  circle3: {
    position: "absolute",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.05)",
    top: "300px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  card: {
    width: 360,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    padding: 20, // 24에서 줄임
    position: "relative",
    zIndex: 1,
    textAlign: "center",
  },
  logoContainer: {
    textAlign: "center",
    marginBottom: 8, // 15에서 줄임
  },
  logo: {
    width: 80,
    height: 80,
    objectFit: "contain",
  },
  content: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: -5, // 글자들을 위로 올리기
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: 700,
    marginBottom: 4, // 6에서 줄임
    color: "#333",
    textAlign: "center",
    width: "100%",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#666",
    marginBottom: 8, // 12에서 줄임
    textAlign: "center",
    width: "100%",
  },
  description: {
    fontSize: "0.85rem", // 0.9rem에서 줄임
    color: "#999",
    marginBottom: 20, // 25에서 줄임
    lineHeight: 1.5, // 1.6에서 줄임
    textAlign: "center",
    width: "100%",
  },
  kakaoBtn: {
    width: "100%",
    height: 44, // 48에서 줄임
    borderRadius: 10,
    border: "1px solid #FEE500",
    background: "#FEE500",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 10, // 12에서 줄임
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  loadingContent: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  spinner: {
    border: "2px solid #f3f3f3",
    borderTop: "2px solid #FEE500",
    borderRadius: "50%",
    width: 18,
    height: 18,
    animation: "spin 1s linear infinite",
  },
  btnContent: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  kakaoIcon: {
    fontSize: "1.2rem",
  },
  features: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 15, // 20에서 줄임
    padding: "0 10px",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#666",
  },
  featureIcon: {
    fontSize: "1rem",
  },
};