import React from "react";
import { FaTint } from "react-icons/fa";
import Header from '../../components/header';
import Footer from '../../components/footer';

function DonationHistory() {
  return (
    <>
      <Header hideAuth />
      <div style={{
        maxWidth: 700,
        margin: '40px auto',
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 24px rgba(23,76,143,0.10)',
        padding: '36px 28px',
        color: '#174c8f',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <FaTint style={{ color: '#d32f2f', fontSize: 32 }} />
          <h1 style={{ color: '#d32f2f', margin: 0 }}>Lịch sử hiến máu</h1>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 17, background: '#f9fafb', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={{ padding: '12px 8px', borderTopLeftRadius: 12 }}>STT</th>
                <th style={{ padding: '12px 8px' }}>Ngày hiến</th>
                <th style={{ padding: '12px 8px' }}>Địa điểm</th>
                <th style={{ padding: '12px 8px', borderTopRightRadius: 12 }}>Lượng máu (ml)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: '#fff' }}>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>1</td>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>10/01/2023</td>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>Bệnh viện A</td>
                <td style={{ padding: '10px 8px', textAlign: 'center', color: '#d32f2f', fontWeight: 600 }}>350</td>
              </tr>
              <tr style={{ background: '#f3f4f6' }}>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>2</td>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>15/06/2023</td>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>Bệnh viện B</td>
                <td style={{ padding: '10px 8px', textAlign: 'center', color: '#d32f2f', fontWeight: 600 }}>350</td>
              </tr>
              <tr style={{ background: '#fff' }}>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>3</td>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>20/12/2023</td>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>TT Hiến Máu Nhân Đạo</td>
                <td style={{ padding: '10px 8px', textAlign: 'center', color: '#d32f2f', fontWeight: 600 }}>350</td>
              </tr>
              <tr style={{ background: '#f3f4f6' }}>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>4</td>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>05/03/2024</td>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>Bệnh viện Chợ Rẫy</td>
                <td style={{ padding: '10px 8px', textAlign: 'center', color: '#d32f2f', fontWeight: 600 }}>350</td>
              </tr>
              <tr style={{ background: '#fff' }}>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>5</td>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>18/05/2024</td>
                <td style={{ padding: '10px 8px', textAlign: 'center' }}>Bệnh viện Đại học Y Dược</td>
                <td style={{ padding: '10px 8px', textAlign: 'center', color: '#d32f2f', fontWeight: 600 }}>350</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DonationHistory;
