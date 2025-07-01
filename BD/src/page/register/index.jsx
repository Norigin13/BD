import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    blood: "",
    phone: "",
    address: "",
    gender: "Male",
    email: "",
    password: "",
    healthNotes: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      dob,
      blood,
      phone,
      address,
      gender,
      email,
      password,
      healthNotes,
    } = form;

    if (!name || !dob || !blood || !phone || !address || !email || !password) {
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }

    const requestBody = {
      fullName: name,
      dob,
      gender,
      bloodType: blood,
      phone,
      email,
      password,
      address,
      latitude: 0,
      longitude: 0,
      lastDonation: null,
      healthNotes,
    };

    try {
      await api.post("/member/register", requestBody);
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(
        error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại."
      );
    }
  };

  return (
    <div className="register-container">
      <h1>Đăng ký hiến máu</h1>
      <form className="register-form" onSubmit={handleSubmit}>
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
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mật khẩu:
          <input
            type="password"
            name="password"
            value={form.password}
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
          Giới tính:
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
            <option value="Other">Khác</option>
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
        <label>
          Ghi chú sức khỏe:
          <textarea
            name="healthNotes"
            value={form.healthNotes}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Gửi đăng ký</button>
      </form>
    </div>
  );
}

export default Register;
