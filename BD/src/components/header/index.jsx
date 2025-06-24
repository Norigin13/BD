import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header({ hideAuth }) {
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
        </div>
      </div>
    </header>
  );
}

export default Header;
