import { useState, useEffect } from "react";
import "./App.css";
import DonationRequest from "./assets/donationRequest/donationRequest";
import CheckBlood from "./assets/checkBlood/checkBlood";

const BLOOD_COMPAT = {
  A: ["A", "O"],
  B: ["B", "O"],
  AB: ["A", "B", "AB", "O"],
  O: ["O"],
};
const BLOOD_LABEL = {
  A: "Nhóm máu A",
  B: "Nhóm máu B",
  AB: "Nhóm máu AB",
  O: "Nhóm máu O",
};

function Header({ onNavigate }) {
  return (
    <header className="main-header">
      <div className="logo">HCA</div>
      <nav className="main-nav">
        <a href="#" onClick={() => onNavigate("home")}>
          Trang chủ
        </a>
        <a href="#">Hỏi - Đáp</a>
        <a href="#">Tin tức</a>
        <a href="#">Liên hệ</a>
      </nav>
      <div className="blood-check-wrap">
        <button className="blood-check-btn" onClick={() => onNavigate("blood")}>
          Kiểm tra tương thích máu
        </button>
      </div>
    </header>
  );
}

function Banner() {
  return (
    <div className="main-banner">
      <div className="banner-left">
        <div className="banner-title">TP.HCM CẦN</div>
        <div className="banner-number">
          2.000 <span>Đơn vị</span>
        </div>
        <div className="banner-desc">
          Phục vụ cứu chữa truyền máu liên tục của người bệnh.
        </div>
      </div>
      <div className="banner-img">
        <img
          src="https://login.medlatec.vn//ImagePath/images/20221219/20221219_Doi-net-tong-quan-ve-viec-hien-mau.jpg"
          alt="Hiến máu"
        />
      </div>
    </div>
  );
}

function BenefitCard() {
  return (
    <div className="benefit-card">
      <div className="benefit-img">
        <img
          src="https://www.aamc.org/sites/default/files/d/1/3-hospitalist_patient-story.jpg__992x558_q85_crop-smart_subsampling-2_upscale.jpg"
          alt="Quyền lợi hiến máu"
        />
      </div>
      <div className="benefit-content">
        <h2>Quyền lợi của người hiến máu</h2>
        <ul>
          <li>
            Được bồi dưỡng trực tiếp: ăn nhẹ, nước uống, nhận quà tặng, nhận
            tiền bồi dưỡng.
          </li>
          <li>Được kiểm tra sức khỏe, xét nghiệm máu miễn phí.</li>
          <li>Được cấp giấy chứng nhận hiến máu tình nguyện.</li>
          <li>Được hỗ trợ máu khi cần truyền máu.</li>
        </ul>
      </div>
    </div>
  );
}

function StandardCard({ icon, text }) {
  return (
    <div className="standard-card">
      <div className="standard-icon">{icon}</div>
      <div className="standard-text">{text}</div>
    </div>
  );
}

function StandardsGrid() {
  const standards = [
    { icon: "🪪", text: "Mang theo chứng minh nhân dân/thẻ căn cước/hộ chiếu." },
    {
      icon: "🧑‍⚕️",
      text: "Người hiến máu tự nguyện, sức khỏe tốt, không mắc bệnh lây nhiễm.",
    },
    { icon: "⚖️", text: "Cân nặng: Nam ≥ 45 kg, Nữ ≥ 45 kg." },
    { icon: "⏳", text: "Người khỏe mạnh trong độ tuổi từ 18 đến 60 tuổi." },
    { icon: "💉", text: "Lượng máu hiến mỗi lần: 250ml, 350ml hoặc 450ml." },
    {
      icon: "🦠",
      text: "Không mắc các bệnh về máu, tim mạch, huyết áp, không nhiễm viêm gan B, C, HIV, giang mai.",
    },
    {
      icon: "🍺",
      text: "Không sử dụng rượu bia, chất kích thích trước khi hiến máu.",
    },
    {
      icon: "📅",
      text: "Khoảng cách giữa 2 lần hiến máu toàn phần tối thiểu là 12 tuần đối với cả Nam và Nữ.",
    },
  ];
  return (
    <div className="standards-section">
      <h2>Tiêu chuẩn tham gia hiến máu</h2>
      <div className="standards-grid">
        {standards.map((s, i) => (
          <StandardCard key={i} icon={s.icon} text={s.text} />
        ))}
      </div>
    </div>
  );
}

function Home({ onRegister, onNavigate }) {
  // Thêm state cho carousel ảnh
  const imageList = [
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1513224502586-d1e602410265?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1585421514738-01798e348b17?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=2740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "hhttps://images.unsplash.com/photo-1611764461465-09162da6465a?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 4) % imageList.length);
    }, 3000); // đổi ảnh mỗi 3 giây
    return () => clearInterval(interval);
  }, [imageList.length]);

  return (
    <div className="home-bg">
      <Header onNavigate={onNavigate} />
      <Banner />
      <button className="register-btn-large" onClick={onRegister}>
        Đăng ký hiến máu
      </button>
      <div className="main-content">
        <BenefitCard />
        <StandardsGrid />
      </div>

      {/* Section: Tin tức nổi bật */}
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "40px auto",
          background: "#fff",
          borderRadius: 16,
          padding: "32px 24px",
          color: "#174c8f",
          fontSize: 20,
          textAlign: "left",
          boxShadow: "0 2px 16px rgba(23,76,143,0.10)",
        }}
      >
        <h2 style={{ color: "#174c8f", marginBottom: 24 }}>Tin tức nổi bật</h2>
        <ul style={{ paddingLeft: 24, fontSize: 18 }}>
          <li>
            <b>04/2024:</b> Chương trình "Giọt máu nghĩa tình" thu hút hơn 2.000
            lượt tham gia tại TP.HCM.
          </li>
          <li>
            <b>03/2024:</b> Hội thảo "Hiến máu cứu người - Hành động nhỏ, ý
            nghĩa lớn" tổ chức tại các trường đại học.
          </li>
          <li>
            <b>02/2024:</b> Đạt mốc 10.000 đơn vị máu hiến tặng trong dịp Tết
            Nguyên Đán.
          </li>
        </ul>
      </div>

      {/* Section: Câu hỏi thường gặp */}
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "40px auto",
          background: "#e3f2fd",
          borderRadius: 16,
          padding: "32px 24px",
          color: "#174c8f",
          fontSize: 20,
          textAlign: "left",
          boxShadow: "0 2px 16px rgba(23,76,143,0.10)",
        }}
      >
        <h2 style={{ color: "#174c8f", marginBottom: 24 }}>
          Câu hỏi thường gặp
        </h2>
        <ul style={{ paddingLeft: 24, fontSize: 18 }}>
          <li>
            <b>Ai có thể tham gia hiến máu?</b> Công dân từ 18-60 tuổi, sức khỏe
            tốt, không mắc bệnh truyền nhiễm.
          </li>
          <li>
            <b>Hiến máu có ảnh hưởng sức khỏe không?</b> Không, nếu tuân thủ
            đúng hướng dẫn và điều kiện hiến máu.
          </li>
          <li>
            <b>Sau bao lâu có thể hiến máu lại?</b> Tối thiểu 12 tuần đối với cả
            nam và nữ.
          </li>
        </ul>
      </div>

      {/* Section: Hình ảnh hoạt động */}
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "40px auto",
          background: "#fff",
          borderRadius: 16,
          padding: "32px 24px",
          color: "#174c8f",
          fontSize: 20,
          textAlign: "center",
          boxShadow: "0 2px 16px rgba(23,76,143,0.10)",
        }}
      >
        <h2 style={{ color: "#174c8f", marginBottom: 24 }}>
          Hình ảnh hoạt động hiến máu
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
          }}
        >
          {Array(3)
            .fill(0)
            .map((_, i) => {
              const idx = (imgIndex + i) % imageList.length;
              return (
                <img
                  key={idx}
                  src={imageList[idx]}
                  alt={`Hiến máu ${idx + 1}`}
                  style={{
                    width: 220,
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 8,
                    transition: "all 5s",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://static.vietnamnet.vn/images/vnn-v2/no-image.png";
                  }}
                />
              );
            })}
        </div>
      </div>

      {/* Section: Cảm nhận người hiến máu */}
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "40px auto 60px auto",
          background: "#e3f2fd",
          borderRadius: 16,
          padding: "32px 24px",
          color: "#174c8f",
          fontSize: 20,
          textAlign: "left",
          boxShadow: "0 2px 16px rgba(23,76,143,0.10)",
        }}
      >
        <h2 style={{ color: "#174c8f", marginBottom: 24 }}>
          Cảm nhận người hiến máu
        </h2>
        <ul style={{ paddingLeft: 24, fontSize: 18 }}>
          <li>
            "Tôi cảm thấy rất vui khi biết rằng máu của mình có thể cứu sống
            người khác." – <b>Nguyễn Văn A</b>
          </li>
          <li>
            "Hiến máu là nghĩa cử cao đẹp, tôi sẽ tiếp tục tham gia nhiều lần
            nữa." – <b>Trần Thị B</b>
          </li>
          <li>
            "Không chỉ giúp người mà còn giúp bản thân kiểm tra sức khỏe định
            kỳ." – <b>Lê Văn C</b>
          </li>
        </ul>
      </div>
    </div>
  );
}

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
        {/* Nút ứng dụng */}
        <div
          style={{
            flex: "1 1 220px",
            minWidth: 220,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <button
            style={{
              background: "#174c8f",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "16px 28px",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
              marginBottom: 20,
              boxShadow: "0 2px 8px rgba(23,76,143,0.08)",
              transition: "background 0.2s",
            }}
            onClick={() => window.open("https://giotmauvang.vn", "_blank")}
          >
            Ứng dụng "Giọt máu vàng" dễ cài
          </button>
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
}

function App() {
  const [page, setPage] = useState("home");
  if (page === "blood")
    return (
      <>
        <div className="app-content">
          <CheckBlood onBack={setPage} />
        </div>
        <Footer />
      </>
    );
  return page === "home" ? (
    <>
      <div className="app-content">
        <Home onRegister={() => setPage("register")} onNavigate={setPage} />
      </div>
      <Footer />
    </>
  ) : (
    <>
      <div className="app-content">
        <DonationRequest onBack={() => setPage("home")} />
      </div>
      <Footer />
    </>
  );
}

export default App;
