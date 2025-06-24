import Header from '../../components/header';
import Footer from '../../components/footer';
import React from "react";
import { FaUserCircle, FaTint, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

function ReceiveBlood() {
  return (
    <>
      <Header hideAuth />
      <div style={{
        maxWidth: 540,
        margin: '40px auto',
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 24px rgba(23,76,143,0.10)',
        padding: '36px 28px',
        color: '#174c8f',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 48, color: '#388e3c', marginBottom: 12 }}>
          <FaCheckCircle />
        </div>
        <h1 style={{ color: '#388e3c', marginBottom: 16 }}>Nhận máu</h1>
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
          maxWidth: 380,
          margin: '0 auto 18px auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <FaUserCircle /> <span>Họ tên:</span> <span style={{ fontWeight: 600 }}>Trần Thị B</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <FaTint /> <span>Nhóm máu cần nhận:</span> <span>A+</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <FaPhoneAlt /> <span>Số điện thoại:</span> <span>0987654321</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <FaEnvelope /> <span>Email:</span> <span>tranthib@email.com</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <FaMapMarkerAlt /> <span>Địa chỉ:</span> <span>456 Đường XYZ, Quận 5, TP.HCM</span>
          </div>
        </div>
        <div style={{ margin: '18px 0', textAlign: 'left', color: '#174c8f', fontSize: 16 }}>
          <b>Lịch sử nhận máu:</b>
          <ul style={{ margin: '10px 0 0 18px', padding: 0 }}>
            <li>Ngày 12/02/2023 - Bệnh viện Chợ Rẫy - 350ml</li>
            <li>Ngày 20/08/2023 - Bệnh viện Đại học Y Dược - 350ml</li>
          </ul>
        </div>
        <div style={{ marginTop: 18, color: '#388e3c', fontSize: 15 }}>
          <b>Hướng dẫn:</b> Mang theo giấy tờ tùy thân, liên hệ trước với bệnh viện để xác nhận thời gian nhận máu.
        </div>
        <div style={{ marginTop: 18, color: '#888', fontSize: 15 }}>
          <b>Trạng thái:</b> <span style={{ color: '#388e3c' }}>Đã nhận đủ</span>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReceiveBlood; 