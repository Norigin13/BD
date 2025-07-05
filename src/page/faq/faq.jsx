import React, { useState } from 'react';

function Faq() {
  const [faqs] = useState([
    {
      id: 1,
      question: "Ai có thể tham gia hiến máu?",
      answer: "Công dân từ 18-60 tuổi, sức khỏe tốt, không mắc bệnh truyền nhiễm, cân nặng từ 45kg trở lên có thể tham gia hiến máu tình nguyện."
    },
    {
      id: 2,
      question: "Hiến máu có ảnh hưởng sức khỏe không?",
      answer: "Không, hiến máu không ảnh hưởng đến sức khỏe nếu tuân thủ đúng hướng dẫn và điều kiện hiến máu. Cơ thể sẽ tái tạo lượng máu đã mất trong vòng 24-48 giờ."
    },
    {
      id: 3,
      question: "Sau bao lâu có thể hiến máu lại?",
      answer: "Tối thiểu 12 tuần đối với cả nam và nữ giữa 2 lần hiến máu toàn phần. Đối với hiến tiểu cầu, có thể hiến sau 2 tuần."
    },
    {
      id: 4,
      question: "Cần chuẩn bị gì trước khi hiến máu?",
      answer: "Ngủ đủ giấc, ăn nhẹ trước khi hiến máu, không uống rượu bia, không hút thuốc lá trong 24 giờ trước khi hiến máu."
    },
    {
      id: 5,
      question: "Quy trình hiến máu như thế nào?",
      answer: "Đăng ký → Khám sức khỏe → Xét nghiệm máu → Hiến máu → Nghỉ ngơi và nhận quà. Tổng thời gian khoảng 30-45 phút."
    },
    {
      id: 6,
      question: "Có được bồi dưỡng gì khi hiến máu không?",
      answer: "Có, người hiến máu được bồi dưỡng trực tiếp: ăn nhẹ, nước uống, nhận quà tặng, nhận tiền bồi dưỡng và được kiểm tra sức khỏe miễn phí."
    },
    {
      id: 7,
      question: "Máu hiến sẽ được sử dụng như thế nào?",
      answer: "Máu hiến sẽ được xét nghiệm, phân loại và sử dụng để cứu chữa bệnh nhân cần truyền máu trong các trường hợp cấp cứu, phẫu thuật, điều trị bệnh."
    },
    {
      id: 8,
      question: "Có thể hiến máu khi đang dùng thuốc không?",
      answer: "Tùy thuộc vào loại thuốc. Một số thuốc có thể ảnh hưởng đến chất lượng máu. Bạn nên tham khảo ý kiến bác sĩ trước khi hiến máu."
    }
  ]);

  const [expandedId, setExpandedId] = useState(null);

  const toggleFaq = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div style={{
      maxWidth: 1000,
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
        Câu hỏi thường gặp
      </h1>
      
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {faqs.map(faq => (
          <div key={faq.id} style={{
            borderBottom: '1px solid #eee',
            transition: 'all 0.3s ease'
          }}>
            <button
              onClick={() => toggleFaq(faq.id)}
              style={{
                width: '100%',
                padding: '20px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#333',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <span>{faq.question}</span>
              <span style={{
                fontSize: '1.5rem',
                color: '#174c8f',
                transition: 'transform 0.3s ease',
                transform: expandedId === faq.id ? 'rotate(45deg)' : 'rotate(0deg)'
              }}>
                +
              </span>
            </button>
            
            {expandedId === faq.id && (
              <div style={{
                padding: '0 20px 20px 20px',
                color: '#666',
                lineHeight: '1.6',
                fontSize: '1rem',
                animation: 'slideDown 0.3s ease'
              }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Faq;
