import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

function Header({ hideAuth }) {
  const navigate = useNavigate();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "null");

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="main-header">
      {/* <div className="logo">HCA</div> */}
      <div className="header-flex-center">
        <nav className="main-nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/faq">Hỏi - Đáp</Link>
          <Link to="/news">Tin tức</Link>
          <Link to="/contact">Liên hệ</Link>
        </nav>
        <div className="user-actions">
          <Link to="/check-blood" className="blood-check-btn">
            Kiểm tra tương thích máu
          </Link>
          {userInfo ? (
            <>
              {userInfo.role && userInfo.role.toUpperCase() === "MEMBER" && (
                <Link to="/user-profile" className="user-btn">
                  Profile
                </Link>
              )}
              <button
                onClick={handleLogout}
                style={{
                  background: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 16px",
                  marginLeft: 16,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              {!hideAuth && (
                <>
                  <Link to="/login" className="login-btn">
                    Đăng nhập
                  </Link>
                  <Link to="/register" className="register-btn-header">
                    Đăng ký
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
