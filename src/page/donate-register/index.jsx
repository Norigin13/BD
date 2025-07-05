import "./index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";

function DonateRegister() {
  const [form, setForm] = useState({
    full_name: "",
    dob: "",
    blood_type: "",
    phone: "",
    contact: "",
    address: "",
    location_id: "",
    needed_date: "",
    note: "",
    component_id: "",
    is_emergency: false,
  });
  const [locations, setLocations] = useState([]);
  const [components, setComponents] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    api.get('/location')
      .then(res => setLocations(res.data))
      .catch(() => setLocations([]));
    api.get('/blood-component')
      .then(res => setComponents(res.data))
      .catch(() => setComponents([]));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) {
      navigate("/login");
      return;
    }
    try {
      const payload = {
        ...form,
        member_id: userInfo.memberId,
        created_at: new Date().toISOString(),
        is_emergency: false,
      };
      await api.post("/blood-request", payload, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setSubmitted(true);
    } catch {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="donate-register-container">
      <h1>Đăng ký hiến máu</h1>
      {error && <div style={{color: 'red', marginBottom: 12}}>{error}</div>}
      {!submitted ? (
        <form className="donate-register-form" onSubmit={handleSubmit}>
          <label>
            Họ tên:
            <input
              type="text"
              name="full_name"
              value={form.full_name}
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
              name="blood_type"
              value={form.blood_type}
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
            Liên hệ khẩn cấp:
            <input
              type="text"
              name="contact"
              value={form.contact}
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
            Bệnh viện muốn hiến máu:
            <select
              name="location_id"
              value={form.location_id}
              onChange={handleChange}
              required
            >
              <option value="">Chọn bệnh viện/địa điểm</option>
              {locations.map(l => (
                <option key={l.location_id} value={l.location_id}>{l.name} - {l.address}</option>
              ))}
            </select>
          </label>
          <label>
            Ngày cần hiến máu:
            <input
              type="date"
              name="needed_date"
              value={form.needed_date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Thành phần máu:
            <select
              name="component_id"
              value={form.component_id}
              onChange={handleChange}
              required
            >
              <option value="">Chọn thành phần máu</option>
              {components.map(c => (
                <option key={c.component_id} value={c.component_id}>{c.name}</option>
              ))}
            </select>
          </label>
          <label>
            Ghi chú:
            <input
              type="text"
              name="note"
              value={form.note}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Gửi đăng ký</button>
        </form>
      ) : (
        <div className="result">
          <h2>Đăng ký hiến máu thành công!</h2>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ full_name: "", dob: "", blood_type: "", phone: "", contact: "", address: "", location_id: "", needed_date: "", note: "", component_id: "", is_emergency: false });
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