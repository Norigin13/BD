import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer
      style={{
        background: "#0d2b4e",
        color: "#fff",
        padding: "40px 0 0 0",
        marginTop: "40px",
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        {/* Logo và liên hệ */}
        <div style={{ flex: "1 1 260px", minWidth: 220 }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: 22,
              color: "#ffd600",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 32, verticalAlign: "middle" }}>🩸</span>{" "}
            GIỌT MÁU VÀNG
          </div>
          <div
            style={{ fontWeight: "bold", marginBottom: 8, color: "#ffd600" }}
          >
            LIÊN HỆ
          </div>
          <div style={{ fontSize: 15, marginBottom: 6 }}>
            TT Hiến Máu Nhân Đạo
            <br />
            466 Nguyễn Tri Phương, P.9, Q.10, TP.HCM
            <br />
            028 3868 5507
          </div>
          <div style={{ fontSize: 15, marginBottom: 6 }}>
            106 Thiên Phước, P.9, Q.Tân Bình, TP.HCM
            <br />
            028 3868 5507
          </div>
          <div style={{ fontWeight: "bold", marginTop: 12, color: "#ffd600" }}>
            Bệnh viện BTH
          </div>
          <div style={{ fontSize: 15 }}>
            118 Hồng Bàng, P.12, Q.5, TP.HCM
            <br />
            028 3957 5182
            <br />
            24 Nguyễn Thị Huỳnh, P.8, Q.Phú Nhuận, TP.HCM
            <br />
            028 3957 5188
          </div>
        </div>
        {/* Hỗ trợ */}
        <div style={{ flex: "1 1 180px", minWidth: 180 }}>
          <div
            style={{ fontWeight: "bold", marginBottom: 8, color: "#ffd600" }}
          >
            HỖ TRỢ
          </div>
          <div style={{ fontSize: 15, marginBottom: 6 }}>
            Điều khoản sử dụng
          </div>
          <div style={{ fontWeight: "bold", marginTop: 18, color: "#ffd600" }}>
            Liên hệ hành chính
          </div>
          <div style={{ fontSize: 15, marginBottom: 6 }}>028 3868 5507</div>
          <div style={{ fontWeight: "bold", marginTop: 18, color: "#ffd600" }}>
            Liên hệ hỗ trợ phần mềm
          </div>
          <div style={{ fontSize: 15, marginBottom: 6 }}>
            028 3957 5182
            <br />
            028 3957 5188
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          paddingTop: 30,
          marginTop: 30,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          fontSize: 14,
          color: "#e3f2fd",
        }}
      >
        © 2024 Giọt máu vàng. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
};

export default Footer;
