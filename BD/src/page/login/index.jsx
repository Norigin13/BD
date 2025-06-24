import "./index.css";
import { useState } from "react";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    // Xử lý đăng nhập ở đây
    alert("Đăng nhập thành công (demo)");
  };

  return (
    <div className="login-container">
      <h1>Đăng nhập</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Tên đăng nhập:
          <input
            type="text"
            name="username"
            value={form.username}
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
        {error && <div className="login-error">{error}</div>}
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
