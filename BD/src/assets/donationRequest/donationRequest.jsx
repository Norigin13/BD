import "./index.css";
import { useState } from "react";

function DonationRequest({ onBack }) {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    blood: "",
    phone: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleBack = () => {
    if (
      !submitted &&
      (form.name || form.dob || form.blood || form.phone || form.address)
    ) {
      if (
        window.confirm(
          "Bạn có chắc chắn muốn quay lại? Dữ liệu chưa gửi sẽ bị mất."
        )
      ) {
        onBack();
      }
    } else {
      onBack();
    }
  };

  return (
    <div className="donate-blood-container">
      <button className="back-btn" onClick={handleBack}>
        ← Quay lại trang chủ
      </button>
      <h1>Đăng ký hiến máu</h1>
      {!submitted ? (
        <form className="donate-form" onSubmit={handleSubmit}>
          <label>
            Họ tên:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Ngày sinh:
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Nhóm máu:
            <select
              name="blood"
              value={form.blood}
              onChange={handleChange}
              required
            >
              <option value="">Chọn nhóm máu</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </label>
          <label>
            Số điện thoại:
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Địa chỉ:
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Gửi đăng ký</button>
        </form>
      ) : (
        <div className="result">
          <h2>Thông tin đăng ký hiến máu</h2>
          <p>
            <b>Họ tên:</b> {form.name}
          </p>
          <p>
            <b>Ngày sinh:</b> {form.dob}
          </p>
          <p>
            <b>Nhóm máu:</b> {form.blood}
          </p>
          <p>
            <b>Số điện thoại:</b> {form.phone}
          </p>
          <p>
            <b>Địa chỉ:</b> {form.address}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", dob: "", blood: "", phone: "", address: "" });
            }}
          >
            Đăng ký mới
          </button>
        </div>
      )}
      <footer
        style={{
          background: "linear-gradient(to bottom, #174c8f, #0d2b4e)",
          color: "#fff",
          padding: "40px 0 20px 0",
          marginTop: "60px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <div style={{ flex: "1 1 220px", minWidth: "220px" }}>
            <h3 style={{ color: "#ffd600" }}>Về Chúng Tôi</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>Giới thiệu</li>
              <li>Sứ mệnh & Tầm nhìn</li>
              <li>Đội ngũ</li>
              <li>Đối tác</li>
              <li>Tin tức & Sự kiện</li>
            </ul>
          </div>
          <div style={{ flex: "1 1 220px", minWidth: "220px" }}>
            <h3 style={{ color: "#ffd600" }}>Hiến Máu</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>Quy trình hiến máu</li>
              <li>Điều kiện hiến máu</li>
              <li>Địa điểm hiến máu</li>
              <li>Lịch hiến máu</li>
              <li>Câu hỏi thường gặp</li>
            </ul>
          </div>
          <div style={{ flex: "1 1 220px", minWidth: "220px" }}>
            <h3 style={{ color: "#ffd600" }}>Hỗ Trợ</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>Liên hệ</li>
              <li>Góp ý</li>
              <li>Tình nguyện viên</li>
              <li>Quyên góp</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </div>
          <div style={{ flex: "1 1 220px", minWidth: "220px" }}>
            <h3 style={{ color: "#ffd600" }}>Liên Hệ</h3>
            <p>Hotline: 1900 1234</p>
            <p>Email: info@blooddonation.vn</p>
            <p>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</p>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            paddingTop: "30px",
            marginTop: "30px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <p>© 2024 Blood Donation. Tất cả quyền được bảo lưu.</p>
          <p>Giấy phép hoạt động số: 123/GP-BYT</p>
        </div>
      </footer>
    </div>
  );
}

export default DonationRequest;
