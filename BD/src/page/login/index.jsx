import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";

function Login() {
  const navigate = useNavigate();
  // State cho form đăng nhập
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  // State cho hiển thị và các bước quên mật khẩu
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotUsername, setForgotUsername] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotError, setForgotError] = useState("");

  // Xử lý đăng nhập thực tế
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    try {
      // Gọi API đăng nhập
      const response = await api.post("/v1/auth/login", form);
      const { role_id, token, user } = response.data;
      if (!token || !user || !user.accountId) {
        throw new Error("Không lấy được thông tin người dùng.");
      }
      // Lưu thông tin user vào localStorage
      const userInfo = {
        id: user.accountId,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        roleId: role_id,
        status: user.status,
        token: token,
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("token", token);
      // Điều hướng theo role
      switch (role_id) {
        case 1:
          navigate("/dashboard");
          break;
        case 2:
          navigate("/sales");
          break;
        case 3:
          navigate("/consulting");
          break;
        case 4:
          navigate("/delivery");
          break;
        case 5:
          navigate("/");
          break;
        default:
          navigate("/");
      }
    } catch {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  // Bước 1: Kiểm tra username khi quên mật khẩu
  const handleForgotCheckUsername = async (e) => {
    e.preventDefault();
    setForgotError("");
    if (!forgotUsername) {
      setForgotError("Vui lòng nhập tên đăng nhập.");
      return;
    }
    try {
      // Gọi API kiểm tra username
      const res = await api.get(
        `/accounts/check-username?username=${encodeURIComponent(
          forgotUsername
        )}`
      );
      if (res.data === true) {
        setForgotStep(2);
      } else {
        setForgotError("Tên đăng nhập không tồn tại.");
      }
    } catch {
      setForgotError("Lỗi kiểm tra tên đăng nhập.");
    }
  };

  // Bước 2: Kiểm tra email và số điện thoại
  const handleForgotCheckEmailPhone = async (e) => {
    e.preventDefault();
    setForgotError("");
    if (!forgotEmail || !forgotPhone) {
      setForgotError("Vui lòng nhập email và số điện thoại.");
      return;
    }
    try {
      // Gọi API xác thực email và số điện thoại
      const res = await api.post("/accounts/verify-email-phone", {
        username: forgotUsername,
        email: forgotEmail,
        phone: forgotPhone,
      });
      if (res.data === true) {
        setForgotStep(3);
      } else {
        setForgotError("Email hoặc số điện thoại không đúng.");
      }
    } catch {
      setForgotError("Lỗi xác thực email/số điện thoại.");
    }
  };

  // Bước 3: Đặt lại mật khẩu mới
  const handleForgotResetPassword = async (e) => {
    e.preventDefault();
    setForgotError("");
    if (!forgotNewPassword || forgotNewPassword.length < 6) {
      setForgotError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    try {
      // Gọi API đặt lại mật khẩu
      await api.put("/accounts/reset-password", {
        username: forgotUsername,
        newPassword: forgotNewPassword,
      });
      alert("Đặt lại mật khẩu thành công! Hãy đăng nhập lại.");
      // Reset lại state quên mật khẩu
      setShowForgot(false);
      setForgotStep(1);
      setForgotUsername("");
      setForgotEmail("");
      setForgotPhone("");
      setForgotNewPassword("");
      setForgotError("");
    } catch {
      setForgotError("Đặt lại mật khẩu thất bại.");
    }
  };

  // Xử lý thay đổi input đăng nhập
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  return (
    <div className="login-container">
      <h1>Đăng nhập</h1>
      {/* Form đăng nhập */}
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
      {/* Nút mở khối quên mật khẩu */}
      <div style={{ marginTop: 12 }}>
        <button
          type="button"
          style={{
            background: "none",
            color: "#d32f2f",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "1em",
          }}
          onClick={() => setShowForgot(!showForgot)}
        >
          Quên mật khẩu?
        </button>
      </div>
      {/* Khối quên mật khẩu 3 bước */}
      {showForgot && (
        <div
          style={{
            marginTop: 24,
            width: "100%",
            background: "#fff8f8",
            borderRadius: 10,
            padding: 18,
            boxShadow: "0 2px 8px #fbb",
          }}
        >
          <h3 style={{ color: "#d32f2f", textAlign: "center" }}>
            Quên mật khẩu
          </h3>
          {/* Bước 1: Nhập username */}
          {forgotStep === 1 && (
            <form onSubmit={handleForgotCheckUsername} className="login-form">
              <label>
                Tên đăng nhập:
                <input
                  type="text"
                  value={forgotUsername}
                  onChange={(e) => setForgotUsername(e.target.value)}
                  required
                />
              </label>
              {forgotError && <div className="login-error">{forgotError}</div>}
              <button type="submit">Tiếp tục</button>
            </form>
          )}
          {/* Bước 2: Nhập email và số điện thoại */}
          {forgotStep === 2 && (
            <form onSubmit={handleForgotCheckEmailPhone} className="login-form">
              <label>
                Email:
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Số điện thoại:
                <input
                  type="text"
                  value={forgotPhone}
                  onChange={(e) => setForgotPhone(e.target.value)}
                  required
                />
              </label>
              {forgotError && <div className="login-error">{forgotError}</div>}
              <button type="submit">Tiếp tục</button>
            </form>
          )}
          {/* Bước 3: Đặt lại mật khẩu mới */}
          {forgotStep === 3 && (
            <form onSubmit={handleForgotResetPassword} className="login-form">
              <label>
                Mật khẩu mới:
                <input
                  type="password"
                  value={forgotNewPassword}
                  onChange={(e) => setForgotNewPassword(e.target.value)}
                  required
                />
              </label>
              {forgotError && <div className="login-error">{forgotError}</div>}
              <button type="submit">Đặt lại mật khẩu</button>
            </form>
          )}
          {/* Hiển thị bước hiện tại và nút đóng */}
          <div style={{ textAlign: "center", marginTop: 10 }}>
            Bước {forgotStep} / 3
            <button
              type="button"
              style={{
                marginLeft: 16,
                background: "none",
                color: "#d32f2f",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                setShowForgot(false);
                setForgotStep(1);
                setForgotUsername("");
                setForgotEmail("");
                setForgotPhone("");
                setForgotNewPassword("");
                setForgotError("");
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
