import React from 'react';
import { useParams, Link } from 'react-router-dom';

const articles = [
    {
      id: 1,
      title: "Chương trình 'Giọt máu nghĩa tình' thu hút hơn 2.000 lượt tham gia tại TP.HCM",
      date: "04/2024",
      content: "Chương trình hiến máu tình nguyện đã thu hút đông đảo người dân tham gia, góp phần cứu sống nhiều bệnh nhân cần truyền máu khẩn cấp. Sự kiện được tổ chức tại công viên Lê Văn Tám, với sự phối hợp của Hội Chữ thập đỏ thành phố và các tình nguyện viên. Ai cũng háo hức, vui vẻ vì được góp một phần nhỏ bé của mình cho cộng đồng.",
      images: [
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2670&auto=format&fit=crop",
        "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2023/8/22/hien-mau-16926970830491837424422.jpg",
        "https://image.thanhnien.vn/w2048/Uploaded/2024/bqmv-cqjw/2022_07_29/hien-mau-xuyen-tet-1-5807.jpg"
        ]
    },
    {
      id: 2,
      title: "Hội thảo 'Hiến máu cứu người - Hành động nhỏ, ý nghĩa lớn'",
      date: "03/2024",
      content: "Hội thảo được tổ chức tại các trường đại học nhằm nâng cao nhận thức về tầm quan trọng của việc hiến máu tình nguyện. Nhiều chuyên gia, bác sĩ đã đến chia sẻ những thông tin bổ ích, cũng như giải đáp thắc mắc của các bạn sinh viên. Buổi hội thảo đã truyền cảm hứng cho rất nhiều bạn trẻ đăng ký tham gia hiến máu.",
      images: [
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2673&auto=format&fit=crop",
        "https://www.hutech.edu.vn/images/news/2024/4/24/_MG_1615.jpg",
        "https://daihoc.fpt.edu.vn/wp-content/uploads/2020/12/3-6-1024x683.jpg"
        ]
    },
    {
      id: 3,
      title: "Đạt mốc 10.000 đơn vị máu hiến tặng trong dịp Tết Nguyên Đán",
      date: "02/2024",
      content: "Chiến dịch hiến máu dịp Tết đã đạt được thành công lớn với sự tham gia nhiệt tình của cộng đồng. Đây là một con số kỷ lục, cho thấy tinh thần tương thân tương ái của người dân Việt Nam. Lượng máu này đã góp phần đảm bảo nguồn máu dự trữ cho các bệnh viện trong và sau Tết.",
      images: [
        "https://images.unsplash.com/photo-1513224502586-d1e602410265?q=80&w=2662&auto=format&fit=crop",
        "https://baotintuc.vn/Uploaded/DMaRSS3oW7e3aHGF2LpvA/2023_01_28/hien-mau-28012023-1-1243.jpg",
        "https://media.vov.vn/sites/default/files/styles/large/public/2024-02/z5162489115160_c1e878e388c3a12d1b716f1a8e0f10c6.jpg"
        ]
    },
    {
      id: 4,
      title: "Ra mắt ứng dụng 'Giọt máu vàng' phiên bản mới",
      date: "01/2024",
      content: "Ứng dụng mới với giao diện thân thiện, dễ sử dụng giúp kết nối người hiến máu và bệnh viện hiệu quả hơn. Người dùng có thể dễ dàng đăng ký lịch hiến máu, theo dõi sức khỏe và nhận thông báo về các sự kiện hiến máu gần nhất.",
      images: [
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2670&auto=format&fit=crop",
        "https://thanhgiong.vn/Data/images/Giot%20mau%20vang%201.jpg",
        "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/1/13/994645/Screen-Shot-2022-01--01.jpg"
        ]
    }
];

function NewsDetail() {
  const { id } = useParams();
  const article = articles.find(a => a.id === parseInt(id));

  if (!article) {
    return (
        <div style={{ textAlign: 'center', padding: '100px' }}>
            <h2>Không tìm thấy bài viết</h2>
            <Link to="/news">Quay lại trang tin tức</Link>
        </div>
    );
  }

  return (
    <div style={{
      maxWidth: 1000,
      margin: '40px auto',
      padding: '20px',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#174c8f', marginBottom: '10px', fontSize: '2.2rem' }}>
        {article.title}
      </h1>
      <p style={{ color: '#666', marginBottom: '20px', fontSize: '0.9rem' }}>
        Ngày đăng: {article.date}
      </p>
      <div style={{
        fontSize: '1.1rem',
        lineHeight: '1.8',
        color: '#333'
      }}>
        {article.content}
      </div>
      
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: '#174c8f', marginBottom: '20px' }}>Hình ảnh liên quan</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {article.images.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`${article.title} - ${index + 1}`}
              style={{
                width: '100%',
                borderRadius: '8px',
                objectFit: 'cover'
              }}
               onError={(e) => {
                e.target.src = 'https://static.vietnamnet.vn/images/vnn-v2/no-image.png';
              }}
            />
          ))}
        </div>
      </div>
       <Link 
        to="/news"
        style={{
          display: 'inline-block',
          marginTop: '40px',
          padding: '12px 24px',
          background: '#174c8f',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '6px'
        }}
        >
        ← Quay lại trang tin tức
      </Link>
    </div>
  );
}

export default NewsDetail; 