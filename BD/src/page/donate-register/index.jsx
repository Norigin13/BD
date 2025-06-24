import "./index.css";
import { useState } from "react";

function DonateRegister() {
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

  return (
    <div className="donate-register-container">
      <h1>Đăng ký hiến máu</h1>
      {!submitted ? (
        <form className="donate-register-form" onSubmit={handleSubmit}>
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
    </div>
  );
}

export default DonateRegister; 