import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function News() {
  const [articles] = useState([
    {
      id: 1,
      title: "Chương trình 'Giọt máu nghĩa tình' thu hút hơn 2.000 lượt tham gia tại TP.HCM",
      date: "04/2024",
      content: "Chương trình hiến máu tình nguyện đã thu hút đông đảo người dân tham gia, góp phần cứu sống nhiều bệnh nhân cần truyền máu khẩn cấp.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Hội thảo 'Hiến máu cứu người - Hành động nhỏ, ý nghĩa lớn'",
      date: "03/2024",
      content: "Hội thảo được tổ chức tại các trường đại học nhằm nâng cao nhận thức về tầm quan trọng của việc hiến máu tình nguyện.",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2673&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Đạt mốc 10.000 đơn vị máu hiến tặng trong dịp Tết Nguyên Đán",
      date: "02/2024",
      content: "Chiến dịch hiến máu dịp Tết đã đạt được thành công lớn với sự tham gia nhiệt tình của cộng đồng.",
      image: "https://images.unsplash.com/photo-1513224502586-d1e602410265?q=80&w=2662&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Ra mắt ứng dụng 'Giọt máu vàng' phiên bản mới",
      date: "01/2024",
      content: "Ứng dụng mới với giao diện thân thiện, dễ sử dụng giúp kết nối người hiến máu và bệnh viện hiệu quả hơn.",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2670&auto=format&fit=crop"
    }
  ]);

  return (
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        color: '#174c8f',
        textAlign: 'center',
        marginBottom: '40px',
        fontSize: '2.5rem'
      }}>
        Tin tức hiến máu
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px'
      }}>
        {articles.map(article => (
          <div key={article.id} style={{
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            transition: 'transform 0.2s',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
            
            <img 
              src={article.image} 
              alt={article.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.src = 'https://static.vietnamnet.vn/images/vnn-v2/no-image.png';
              }}
            />
            
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{
                color: '#174c8f',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                {article.date}
              </div>
              
              <h3 style={{
                color: '#333',
                marginBottom: '15px',
                fontSize: '1.2rem',
                lineHeight: '1.4',
                flexGrow: 1
              }}>
                {article.title}
              </h3>
              
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                fontSize: '0.95rem'
              }}>
                {article.content}
              </p>
              
              <Link to={`/news/${article.id}`} style={{
                background: '#174c8f',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                marginTop: '15px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textDecoration: 'none',
                textAlign: 'center'
              }}>
                Đọc thêm
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
