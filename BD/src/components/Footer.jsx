import React from "react";
import "../assets/footer/index.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-wave"></div>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Về Chúng Tôi</h3>
          <ul>
            <li>
              <a href="/about">Giới thiệu</a>
            </li>
            <li>
              <a href="/mission">Sứ mệnh & Tầm nhìn</a>
            </li>
            <li>
              <a href="/team">Đội ngũ</a>
            </li>
            <li>
              <a href="/partners">Đối tác</a>
            </li>
            <li>
              <a href="/news">Tin tức & Sự kiện</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Hiến Máu</h3>
          <ul>
            <li>
              <a href="/donate">Quy trình hiến máu</a>
            </li>
            <li>
              <a href="/eligibility">Điều kiện hiến máu</a>
            </li>
            <li>
              <a href="/locations">Địa điểm hiến máu</a>
            </li>
            <li>
              <a href="/schedule">Lịch hiến máu</a>
            </li>
            <li>
              <a href="/faq">Câu hỏi thường gặp</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Hỗ Trợ</h3>
          <ul>
            <li>
              <a href="/contact">Liên hệ</a>
            </li>
            <li>
              <a href="/feedback">Góp ý</a>
            </li>
            <li>
              <a href="/volunteer">Tình nguyện viên</a>
            </li>
            <li>
              <a href="/donate-money">Quyên góp</a>
            </li>
            <li>
              <a href="/privacy">Chính sách bảo mật</a>
            </li>
          </ul>
        </div>

        <div className="footer-section footer-contact">
          <h3>Liên Hệ</h3>
          <p>
            <FaPhone /> Hotline: 1900 1234
          </p>
          <p>
            <FaEnvelope /> Email: info@blooddonation.vn
          </p>
          <p>
            <FaMapMarkerAlt /> Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM
          </p>
          <div className="footer-social">
            <a href="#" className="social-icon">
              <FaFacebook />
            </a>
            <a href="#" className="social-icon">
              <FaTwitter />
            </a>
            <a href="#" className="social-icon">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Blood Donation. Tất cả quyền được bảo lưu.</p>
        <p>Giấy phép hoạt động số: 123/GP-BYT</p>
      </div>
    </footer>
  );
};

export default Footer;
