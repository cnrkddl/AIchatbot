import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 검증은 생략, 바로 로그인 처리
    onLogin();
  };

  return (
    <div>
      <style>{`
        .form { 
          display: flex;
          flex-direction: column;
          gap: 10px;
          background-color: #ffffff; 
          padding: 30px; 
          width: 450px; 
          border-radius: 20px; 
          font-family: Roboto, 'Noto Sans KR', sans-serif;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          margin: 50px auto;
        }
        .flex-column > label { 
          color: #151717; 
          font-weight: 600;
        }
        .inputForm {
          border: 1.5px solid #ecedec; 
          border-radius: 10px;
          height: 50px; 
          display: flex;
          align-items: center; 
          padding-left: 10px;
          transition: 0.2s ease-in-out;
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
          font-weight: 500; 
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

      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>ID</label>
        </div>
        <div className="inputForm">
          <input
            placeholder="Enter your ID"
            className="input"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <input
            placeholder="Enter your Password"
            className="input"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </div>

        <span className="span">비밀번호를 잊어버렸나요?</span>

        <button className="button-submit" type="submit">
          Sign In
        </button>

        <button className="kakao-button" type="button">
          <div>카카오 로그인</div>
        </button>

        <p className="p">
          계정이 없으신가요? <span className="span">Sign Up</span>
        </p>
      </form>
    </div>
  );
}
