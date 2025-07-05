import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ChatbotBubble from '../../components/ChatbotBubble';

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

function ActivityGallery() {
    const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2670&auto=format&fit=crop',
      title: 'Giọt máu sẽ chia - Ân tình mùa dịch',
      date: '02/10/2021',
      featured: true,
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2673&auto=format&fit=crop',
      title: 'Người dân tham gia hiến máu tình nguyện',
    },
     {
      id: 3,
      src: 'https://images.unsplash.com/photo-1513224502586-d1e602410265?q=80&w=2662&auto=format&fit=crop',
      title: 'Hiến máu tại các điểm lưu động',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2670&auto=format&fit=crop',
      title: 'Đội ngũ y bác sĩ tận tình',
    },
     {
      id: 5,
      src: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=2740&auto=format&fit=crop',
      title: 'Kiểm tra sức khỏe trước khi hiến máu',
    },
  ];

  const featuredImage = images.find(img => img.featured);
  const otherImages = images.filter(img => !img.featured);

  return (
    <div className="activity-gallery">
      <div className="gallery-featured">
        <img src={featuredImage.src} alt={featuredImage.title} />
        <div className="gallery-featured-caption">
          <h3>{featuredImage.title}</h3>
          <span>{featuredImage.date}</span>
        </div>
      </div>
      <div className="gallery-grid">
        {otherImages.map(image => (
          <div className="gallery-item" key={image.id}>
            <img src={image.src} alt={image.title} />
             <div className="gallery-item-caption">
              <p>{image.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const handleEmergencyClick = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);
  const handleSelect = (isEmergency) => {
    setShowPopup(false);
    if (isEmergency) {
      navigate("/emergency-donation?emergency=1");
    } else {
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.token) {
        navigate("/login");
      } else {
        navigate("/emergency-donation?emergency=0");
      }
    }
  };
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content fade-in">
          <div className="hero-need">
            <h2>TP.HCM CẦN</h2>
            <div className="number">2.000</div>
            <div className="unit">Đơn vị</div>
          </div>
          <p className="hero-description fade-in delay-1">
            Phục vụ cứu chữa truyền máu liên tục của người bệnh. Mỗi giọt máu của bạn là một cơ hội sống cho những người cần giúp đỡ.
          </p>
          <div className="hero-buttons fade-in delay-2" style={{display: 'flex', gap: 24, justifyContent: 'center', marginTop: 32}}>
            <Link to="/donate-register" className="btn btn-donate-primary btn-large animated-btn">
              <span className="btn-icon" role="img" aria-label="blood">🩸</span> Đăng ký hiến máu
            </Link>
            <button type="button" onClick={handleEmergencyClick} className="btn btn-donate-secondary btn-large animated-btn">
              <span className="btn-icon" role="img" aria-label="flash">⚡</span> Cần máu khẩn cấp
            </button>
          </div>
        </div>
        <div className="hero-image fade-in delay-3">
          <div className="hero-illustration"></div>
        </div>
      </div>
      {showPopup && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <div style={{background:'#fff',padding:32,borderRadius:12,minWidth:320,boxShadow:'0 2px 16px rgba(23,76,143,0.10)',display:'flex',flexDirection:'column',gap:18,alignItems:'center'}}>
            <h3>Bạn có phải trường hợp khẩn cấp không?</h3>
            <div style={{display:'flex',gap:18}}>
              <button onClick={()=>handleSelect(true)} style={{background:'#d32f2f',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:600}}>Khẩn cấp</button>
              <button onClick={()=>handleSelect(false)} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:600}}>Không khẩn cấp</button>
            </div>
            <button onClick={handleClose} style={{marginTop:12,background:'#eee',color:'#174c8f',border:'none',borderRadius:8,padding:'6px 18px',fontWeight:600}}>Đóng</button>
          </div>
        </div>
      )}
    </section>
  );
}

function BenefitsGrid() {
  const benefits = [
    {
      icon: '🍎',
      title: 'Chế độ dinh dưỡng',
      desc: 'Được bồi dưỡng trực tiếp: ăn nhẹ, nước uống, nhận quà tặng, nhận tiền bồi dưỡng.'
    },
    {
      icon: '🏥',
      title: 'Khám sức khỏe miễn phí',
      desc: 'Được kiểm tra sức khỏe, xét nghiệm máu miễn phí trước khi hiến máu.'
    },
    {
      icon: '🎫',
      title: 'Giấy chứng nhận',
      desc: 'Được cấp giấy chứng nhận hiến máu tình nguyện từ cơ quan y tế.'
    },
    {
      icon: '🩺',
      title: 'Hỗ trợ y tế',
      desc: 'Được hỗ trợ máu khi cần truyền máu cho bản thân và gia đình.'
    }
  ];
  return (
    <section className="content-section">
      <div className="container">
        <h2 className="section-title">Quyền lợi của người hiến máu</h2>
        <div className="modern-benefits-grid">
          {benefits.map((b, i) => (
            <div className={`modern-benefit-card-2x2 fade-in${i ? ` delay-${i}` : ''}`} key={i}>
              <div className="modern-benefit-icon-2x2">{b.icon}</div>
              <div className="modern-benefit-title-2x2">{b.title}</div>
              <div className="modern-benefit-desc-2x2">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      text: 'Tôi cảm thấy rất vui khi biết rằng máu của mình có thể cứu sống người khác.',
      author: 'Nguyễn Văn A',
      color: '#2563eb'
    },
    {
      text: 'Hiến máu là nghĩa cử cao đẹp, tôi sẽ tiếp tục tham gia nhiều lần nữa.',
      author: 'Trần Thị B',
      color: '#2563eb'
    },
    {
      text: 'Không chỉ giúp người mà còn giúp bản thân kiểm tra sức khỏe định kỳ.',
      author: 'Lê Văn C',
      color: '#2563eb'
    },
  ];
  const [startIdx, setStartIdx] = useState(0);
  const visibleCount = 3;
  const canPrev = startIdx > 0;
  const canNext = startIdx + visibleCount < testimonials.length;
  const handlePrev = () => {
    if (canPrev) setStartIdx(startIdx - 1);
  };
  const handleNext = () => {
    if (canNext) setStartIdx(startIdx + 1);
  };
  return (
    <section className="content-section testimonials">
      <div className="container">
        <h2 className="section-title">Cảm nhận người hiến máu</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <button
            onClick={handlePrev}
            disabled={!canPrev}
            style={{
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '50%',
              width: 40,
              height: 40,
              fontSize: 24,
              color: '#2563eb',
              cursor: canPrev ? 'pointer' : 'not-allowed',
              marginRight: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              opacity: canPrev ? 1 : 0.5
            }}
            aria-label="Xem trước"
          >
            &#8592;
          </button>
          <div className="testimonial-grid" style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
            {testimonials.slice(startIdx, startIdx + visibleCount).map((t, i) => (
              <div className="testimonial-card fade-in" key={i}>
                <div className="testimonial-usericon pulse" style={{ fontSize: 36, color: '#dc2626', marginBottom: 8 }}>
                  <span role="img" aria-label="user-logo">👤</span>
                </div>
                <div style={{ fontSize: '2rem', color: '#2563eb', marginBottom: 8 }}>&ldquo;</div>
                <p className="testimonial-text" style={{ fontStyle: 'italic', marginBottom: 12 }}>{t.text}</p>
                <div className="testimonial-author" style={{ color: t.color, fontWeight: 600 }}>- {t.author}</div>
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={!canNext}
            style={{
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '50%',
              width: 40,
              height: 40,
              fontSize: 24,
              color: '#2563eb',
              cursor: canNext ? 'pointer' : 'not-allowed',
              marginLeft: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              opacity: canNext ? 1 : 0.5
            }}
            aria-label="Xem tiếp"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="home-bg">
      <HeroSection />
      <BenefitsGrid />
      <div className="activity-gallery-section">
        <h2 style={{ color: "#174c8f", marginBottom: 24, textAlign: 'center' }}>
          Hình ảnh hoạt động hiến máu
        </h2>
        <ActivityGallery />
      </div>
      <TestimonialsSection />
      <ChatbotBubble />
    </div>
  );
}

export default Home;
