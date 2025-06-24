import Header from '../../components/header';
import Footer from '../../components/footer';
import React from "react";
import { FaPhoneAlt, FaExclamationTriangle, FaMapMarkerAlt, FaTint } from "react-icons/fa";

function EmergencyReceiveBlood() {
  return (
    <>
      <Header hideAuth />
      <div style={{
        maxWidth: 540,
        margin: '40px auto',
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 24px rgba(220,38,38,0.10)',
        padding: '36px 28px',
        color: '#174c8f',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{ fontSize: 48, color: '#d32f2f', marginBottom: 12 }}>
          <FaExclamationTriangle />
        </div>
        <h1 style={{ color: '#d32f2f', marginBottom: 16 }}>Nhận máu khẩn cấp</h1>
        <p style={{ fontSize: 18, marginBottom: 18 }}>
          Nếu bạn hoặc người thân cần nhận máu khẩn cấp, vui lòng liên hệ ngay với các số điện thoại sau:
        </p>
        <div style={{
          background: '#fff3e0',
          borderRadius: 12,
          padding: '18px 12px',
          marginBottom: 18,
          boxShadow: '0 2px 8px rgba(220,38,38,0.08)',
          color: '#b71c1c',
          fontWeight: 600,
          fontSize: 17
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 8 }}>
            <FaPhoneAlt /> <span>Bệnh viện Truyền máu Huyết học:</span> <span>028 3957 5182</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 8 }}>
            <FaPhoneAlt /> <span>Bệnh viện Chợ Rẫy:</span> <span>028 3855 4137</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 8 }}>
            <FaPhoneAlt /> <span>Bệnh viện Nhân Dân 115:</span> <span>028 3865 2368</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 8 }}>
            <FaPhoneAlt /> <span>Bệnh viện Đại học Y Dược:</span> <span>028 3952 5355</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
            <FaPhoneAlt /> <span>Bệnh viện Quân Y 175:</span> <span>028 3899 8080</span>
          </div>
        </div>
        <div style={{ margin: '18px 0', textAlign: 'left', color: '#174c8f', fontSize: 16 }}>
          <b>Địa chỉ các điểm nhận máu lớn tại TP.HCM:</b>
          <ul style={{ margin: '10px 0 0 18px', padding: 0 }}>
            <li>TT Hiến Máu Nhân Đạo: 466 Nguyễn Tri Phương, P.9, Q.10</li>
            <li>106 Thiên Phước, P.9, Q.Tân Bình</li>
            <li>Bệnh viện Truyền máu Huyết học: 118 Hồng Bàng, P.12, Q.5</li>
            <li>24 Nguyễn Thị Huỳnh, P.8, Q.Phú Nhuận</li>
            <li>Bệnh viện Chợ Rẫy: 201B Nguyễn Chí Thanh, Q.5</li>
            <li>Bệnh viện Đại học Y Dược: 215 Hồng Bàng, Q.5</li>
            <li>Bệnh viện Quân Y 175: 786 Nguyễn Kiệm, Q.Gò Vấp</li>
          </ul>
        </div>
        <div style={{ marginTop: 18, color: '#388e3c', fontSize: 15 }}>
          <b>Hướng dẫn:</b> Mang theo giấy tờ tùy thân, liên hệ trước với bệnh viện để xác nhận thời gian nhận máu.
        </div>
        <div style={{ marginTop: 18, color: '#888', fontSize: 15 }}>
          <b>Trạng thái:</b> <span style={{ color: '#d32f2f' }}>Đang chờ xử lý</span>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EmergencyReceiveBlood; 