import Header from '../../components/header';
import Footer from '../../components/footer';
import React from "react";
import { FaUserCircle, FaBirthdayCake, FaTint, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function UserProfile() {
  return (
    <>
      <Header hideAuth />
      <div style={{
        maxWidth: 480,
        margin: '40px auto',
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 24px rgba(23,76,143,0.10)',
        padding: '36px 28px',
        color: '#174c8f',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 64, color: '#d32f2f', marginBottom: 12 }}>
          <FaUserCircle />
        </div>
        <h1 style={{ color: '#d32f2f', marginBottom: 18 }}>Hồ sơ cá nhân</h1>
        <div style={{
          background: '#f3f4f6',
          borderRadius: 12,
          padding: '18px 12px',
          marginBottom: 18,
          boxShadow: '0 2px 8px rgba(23,76,143,0.08)',
          color: '#174c8f',
          fontWeight: 500,
          fontSize: 17,
          textAlign: 'left',
          maxWidth: 340,
          margin: '0 auto 18px auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <FaUserCircle /> <span>Họ tên:</span> <span style={{ fontWeight: 600 }}>Nguyễn Văn A</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <FaBirthdayCake /> <span>Ngày sinh:</span> <span>01/01/1990</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <FaTint /> <span>Nhóm máu:</span> <span>O+</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <FaPhoneAlt /> <span>Số điện thoại:</span> <span>0123456789</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <FaEnvelope /> <span>Email:</span> <span>nguyenvana@email.com</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <FaMapMarkerAlt /> <span>Địa chỉ:</span> <span>123 Đường ABC, Quận 1, TP.HCM</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>Số CMND/CCCD:</span> <span>123456789012</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>Ngày đăng ký:</span> <span>01/01/2023</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontWeight: 600 }}>Trạng thái hiến máu:</span> <span style={{ color: '#388e3c' }}>Đang hoạt động</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
