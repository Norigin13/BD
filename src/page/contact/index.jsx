import "./index.css";
import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    setSent(true);
  };

  return (
    <div className="contact-page-layout">
      <div className="contact-info-card">
        <h2>Liên hệ</h2>
        <div className="contact-info-block">
          <div className="contact-info-block-header">
            <div className="contact-info-icon">
              <span role="img" aria-label="email">✉️</span>
            </div>
            <div className="contact-info-label">Email</div>
          </div>
          <div className="contact-info-value">gmv@intelin.vn</div>
        </div>
        <hr className="contact-info-divider" />
        <div className="contact-info-block">
          <div className="contact-info-block-header">
            <div className="contact-info-icon">
              <span role="img" aria-label="phone">📞</span>
            </div>
            <div className="contact-info-label">Hotline</div>
          </div>
          <div className="contact-info-hotlines">
            <div><b>TT Hiến Máu Nhân Đạo:</b><br/>028 3868 5509<br/>028 3868 5507</div>
            <div style={{marginTop: 12}}><b>Bệnh viện BTH:</b><br/>028 3973 7142<br/>028 3957 8588</div>
            <div style={{marginTop: 12}}><b>TT truyền máu Chợ Rẫy:</b><br/>028 3955 5885</div>
          </div>
        </div>
      </div>
      <div className="contact-form-section">
        <h2 className="contact-form-title">Gửi lời nhắn cho chúng tôi</h2>
        <p className="contact-form-desc">
          Nếu bạn có bất kỳ thắc mắc nào liên quan đến các hoạt động hiến máu tình nguyện, xin vui lòng liên hệ với chúng tôi qua địa chỉ email <a href="mailto:gmv@intelin.vn" style={{color:'#2563eb',textDecoration:'underline'}}>gmv@intelin.vn</a> hoặc gửi thông tin cho chúng tôi theo mẫu bên dưới:
        </p>
        {!sent ? (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Họ và tên
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Vui lòng nhập họ và tên"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Vui lòng nhập email"
                required
              />
            </label>
            <label>
              Lời nhắn
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Vui lòng nhập lời nhắn"
                required
                rows={4}
              />
            </label>
            {error && <div className="contact-error">{error}</div>}
            <button type="submit" className="contact-submit-btn">Gửi lời nhắn</button>
          </form>
        ) : (
          <div className="contact-success">
            <h2>Đã gửi liên hệ thành công!</h2>
            <p>Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact; 