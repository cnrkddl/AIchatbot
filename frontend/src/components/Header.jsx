import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell"; // ✅ default import

export default function Header({ onFAQClick }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isChatPage = pathname === "/chat";
  const showNotification = ["/", "/patient"].includes(pathname);

  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px",
      padding: "0 1rem",
      borderBottom: "1px solid #ddd",
      background: "#fff",
      boxSizing: "border-box",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      position: "relative",
    }}>
      <h1
        style={{ margin: 0, fontSize: "1.25rem", cursor: "pointer", fontWeight: 600, color: "#333" }}
        onClick={() => navigate("/")}
      >
        AI Care
      </h1>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {isChatPage && (
          <button
            style={buttonStyle}
            onClick={onFAQClick}
            aria-label="FAQ"
          >
            ?
          </button>
        )}

        {showNotification && <NotificationBell />} {/* ✅ 여기서 객체가 아니라 함수여야 함 */}
      </div>
    </header>
  );
}

const buttonStyle = {
  width: 40,
  height: 40,
  fontSize: "1.25rem",
  borderRadius: "50%",
  border: "none",
  background: "#f5f5f5",
  fontWeight: "bold",
  cursor: "pointer",
  color: "#333",
};
