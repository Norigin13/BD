import React, { useEffect, useState } from "react";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";

function StaffBloodInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get("/blood-inventory")
      .then(res => {
        setInventory(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải dữ liệu kho máu.");
        setLoading(false);
      });
  }, []);

  return (
    <SidebarLayout title="Quản lý kho máu" isStaff>
      <div style={{ padding: 32 }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}>Danh sách kho máu</h2>
        {loading ? <div>Đang tải...</div> : error ? <div style={{color:'red'}}>{error}</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Bệnh viện</th>
                <th style={thStyle}>Nhóm máu</th>
                <th style={thStyle}>Thành phần máu</th>
                <th style={thStyle}>Số lượng</th>
                <th style={thStyle}>Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(i => (
                <tr key={i.inventory_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{i.inventory_id}</td>
                  <td style={tdStyle}>{i.location_name || i.location_id}</td>
                  <td style={tdStyle}>{i.blood_type}</td>
                  <td style={tdStyle}>{i.component_name || i.component_id}</td>
                  <td style={tdStyle}>{i.unit_count}</td>
                  <td style={tdStyle}>{i.last_updated}</td>
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
export default StaffBloodInventory; 