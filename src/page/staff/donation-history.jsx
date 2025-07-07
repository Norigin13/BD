import React, { useEffect, useState } from "react";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";

function StaffDonationHistory() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get("/donation")
      .then(res => {
        setDonations(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải dữ liệu lịch sử hiến máu.");
        setLoading(false);
      });
  }, []);

  return (
    <SidebarLayout title="Lịch sử hiến máu" isStaff>
      <div style={{ padding: 32 }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}>Lịch sử hiến máu các thành viên</h2>
        {loading ? <div>Đang tải...</div> : error ? <div style={{color:'red'}}>{error}</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Thành viên</th>
                <th style={thStyle}>Bệnh viện</th>
                <th style={thStyle}>Ngày hiến</th>
                <th style={thStyle}>Thể tích (ml)</th>
                <th style={thStyle}>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(d => (
                <tr key={d.donation_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{d.donationId}</td>
                  <td style={tdStyle}>{d.member_id}</td>
                  <td style={tdStyle}>{d.location_id}</td>
                  <td style={tdStyle}>{d.date}</td>
                  <td style={tdStyle}>{d.volumeMl}</td>
                  <td style={tdStyle}>{d.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </SidebarLayout>
  );
}

const thStyle = { padding: '10px 8px', fontWeight: 600 };
const tdStyle = { padding: '10px 8px', textAlign: 'center' };
export default StaffDonationHistory; 