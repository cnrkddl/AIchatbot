import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 검증은 생략, 바로 로그인 처리
    if (typeof onLogin === "function") onLogin();
  };

  return (
    <div className="page">
      <style>{`
        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          padding: 16px;
          box-sizing: border-box;
        }
        .wrap {
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .title {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 8px 0 8px;
          color: #111827;
          text-align: center;
        }
        .subtitle {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
          text-align: center;
        }

        .form { 
          display: flex;
          flex-direction: column;
          gap: 10px;
          background-color: #ffffff; 
          padding: 30px; 
          width: 100%;
          border-radius: 20px; 
          font-family: Roboto, 'Noto Sans KR', sans-serif;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border: 1px solid #e5e7eb;
          box-sizing: border-box;
        }
        .flex-column > label { 
          color: #151717; 
          font-weight: 600;
          font-size: 14px;
        }
        .inputForm {
          border: 1.5px solid #ecedec; 
          border-radius: 10px;
          height: 50px; 
          display: flex;
          align-items: center; 
          padding-left: 10px;
          transition: 0.2s ease-in-out;
          background: #fff;
        }
        .inputForm:hover {
          border-color: #a1a1a1;
        }
        .inputForm:focus-within {
          border: 1.5px solid #2d79f3;
        }
        .input {
          border-radius: 10px; 
          border: none; 
          width: 100%; 
          height: 100%;
          outline: none;
          font-family: Roboto, 'Noto Sans KR', sans-serif;
          padding-left: 10px;
          font-size: 14px;
          background: transparent;
        }
        ::placeholder {
          font-family: Roboto, 'Noto Sans KR', sans-serif;
          color: #aaa;
        }
        .span { 
          font-size: 14px; 
          margin-left: 5px; 
          color: #2d79f3; 
          font-weight: 500; 
          cursor: pointer;
        }
        .button-submit {
          margin: 20px 0 10px 0; 
          background-color: #151717; 
          border: none; 
          color: white; 
          font-size: 15px; 
          font-weight: 700; 
          border-radius: 10px; 
          height: 50px; 
          width: 100%;
          cursor: pointer;
          transition: 0.2s ease-in-out;
        }
        .button-submit:hover {
          background-color: #333333;
        }
        .kakao-button {
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          width: 100%;
          margin-top: 10px;
        }
        .kakao-button div {
          background-color: #FEE500;
          border-radius: 10px;
          height: 50px;
          font-weight: 700;
          font-size: 16px;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div className="wrap">
        {/* 상단 타이틀 */}
        <h1 className="title">AI CARE</h1>
        {/* <p className="subtitle">보호자 전용 케어 포털</p> */}

        {/* 기존 로그인 폼 */}
        <form className="form" onSubmit={handleSubmit}>
          <div className="flex-column">
            <label htmlFor="login-id">ID</label>
          </div>
          <div className="inputForm">
            <input
              id="login-id"
              placeholder="Enter your ID"
              className="input"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="flex-column">
            <label htmlFor="login-pw">Password</label>
          </div>
          <div className="inputForm">
            <input
              id="login-pw"
              placeholder="Enter your Password"
              className="input"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <span className="span">비밀번호를 잊어버렸나요?</span>

          <button className="button-submit" type="submit">
            Sign In
          </button>

          {/* 필요시 유지/삭제 선택 */}
          <button className="kakao-button" type="button">
            <div>카카오 로그인</div>
          </button>

          {/* 요청대로 Sign Up 문구는 제거 */}
        </form>
      </div>
    </div>
  );
}
