import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotError, setForgotError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    let response;
    try {
      // Thử đăng nhập với member
      response = await api.post("/member/login", { email: form.email, password: form.password });
    } catch {
      try {
        // Nếu thất bại, thử với admin
        response = await api.post("/admin/login", { email: form.email, password: form.password });
      } catch {
        try {
          // Nếu tiếp tục thất bại, thử với staff
          response = await api.post("/staff/login", { email: form.email, password: form.password });
        } catch {
          setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
          return;
        }
      }
    }
    try {
      let user, role;
      if (response.data.admin) {
        user = response.data.admin;
        role = response.data.role || "ADMIN";
      } else if (response.data.member) {
        user = response.data.member;
        role = response.data.role || "MEMBER";
      } else if (response.data.staff) {
        user = response.data.staff;
        role = response.data.role || "STAFF";
      }
      const token = response.data.token;

      if (!token || !user) {
        throw new Error("Không lấy được thông tin người dùng.");
      }
      const userInfo = { ...user, token, role };
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      sessionStorage.setItem("token", token);


      // Điều hướng dựa vào role
      switch (role.toUpperCase()) {
        case "MANAGER":
          navigate("/admin");
          break;
        case "STAFF":
          navigate("/staff");
          break;
        case "MEMBER":
          navigate("/home");
          break;
        default:
          navigate("/");
      }
      window.location.reload();
    } catch (err) {
      console.error("Login failed:", err);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setForgotError("");
    if (!forgotEmail) {
      setForgotError("Vui lòng nhập email.");
      return;
    }
    try {
      // await api.post("/auth/forgot-password", { email: forgotEmail });
      toast.success("Mã OTP đã được gửi đến email của bạn.");
      setForgotStep(2);
    } catch (err) {
      console.error(err);
      setForgotError("Email không tồn tại hoặc có lỗi xảy ra.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setForgotError("");
    if (!otp || !newPassword) {
      setForgotError("Vui lòng nhập mã OTP và mật khẩu mới.");
      return;
    }
    if (newPassword.length < 6) {
      setForgotError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    try {
      // await api.post("/auth/reset-password", { email: forgotEmail, otp, newPassword });
      toast.success("Đặt lại mật khẩu thành công!");
      setShowForgot(false);
      setForgotStep(1);
      setForgotEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      setForgotError("Mã OTP không đúng hoặc có lỗi xảy ra.");
    }
  };

  return (
    <div className="login-container">
      <h1>Đăng nhập</h1>
      <form className="login-form" onSubmit={handleSubmit}>
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
        {error && <div className="login-error">{error}</div>}
        <button type="submit">Đăng nhập</button>
      </form>

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
          {forgotStep === 1 && (
            <form onSubmit={handleSendOtp} className="login-form">
              <label>
                Email:
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </label>
              {forgotError && <div className="login-error">{forgotError}</div>}
              <button type="submit">Gửi mã OTP</button>
            </form>
          )}

          {forgotStep === 2 && (
            <form onSubmit={handleResetPassword} className="login-form">
              <label>
                Mã OTP:
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </label>
              <label>
                Mật khẩu mới:
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </label>
              {forgotError && <div className="login-error">{forgotError}</div>}
              <button type="submit">Đặt lại mật khẩu</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
