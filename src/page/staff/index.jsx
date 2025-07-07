import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaTint,
  FaHandHoldingMedical,
  FaHandHoldingWater,
} from "react-icons/fa";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios"; // Thêm dòng này nếu chưa có

const stats = [
  {
    icon: <FaUsers />,
    label: "Tổng thành viên",
    value: 3456,
    color: "#2563eb",
  },
  { icon: <FaTint />, label: "Đơn vị máu", value: 1200, color: "#d32f2f" },
  {
    icon: <FaHandHoldingMedical />,
    label: "Yêu cầu hiến máu",
    value: 87,
    color: "#fbbf24",
  },
  {
    icon: <FaHandHoldingWater />,
    label: "Yêu cầu nhận máu",
    value: 42,
    color: "#388e3c",
  },
];

function StaffDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState([]);
  const [emergencyRequests, setEmergencyRequests] = useState([]);

  useEffect(() => {
    // Gọi API lấy danh sách blood requests
    api.get("/blood-request?status=pending").then((res) => {
      setRequests(res.data || []);
      // Lọc đơn khẩn cấp
      const emergencies = (res.data || []).filter(
        (r) => r.isEmergency || r.is_emergency
      );
      setEmergencyRequests(emergencies);
      // Nếu có đơn thường hoặc đơn khẩn cấp thì hiện modal
      if (res.data && res.data.length > 0) setShowModal(true);
    });
  }, []);

  return (
    <SidebarLayout title="Dashboard Staff" isStaff>
      {/* Pop-up thông báo */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              minWidth: 400,
              boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
            }}
          >
            <h2>Thông báo đơn hiến máu</h2>
            {requests.length > 0 && (
              <div>
                <b>Có {requests.length} đơn hiến/nhận máu chờ duyệt!</b>
              </div>
            )}
            {emergencyRequests.length > 0 && (
              <div style={{ color: "red", marginTop: 12 }}>
                <b>Có {emergencyRequests.length} đơn khẩn cấp!</b>
              </div>
            )}
            <button
              onClick={() => setShowModal(false)}
              style={{ marginTop: 24 }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Dashboard cũ */}
      <div
        style={{
          display: "flex",
          gap: 32,
          margin: "32px 32px 0 32px",
          flexWrap: "wrap",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 8px rgba(23,76,143,0.07)",
              padding: "28px 32px",
              minWidth: 220,
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div style={{ fontSize: 36, color: s.color }}>{s.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 22 }}>{s.value}</div>
              <div style={{ color: "#64748b", fontSize: 15 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          margin: "32px",
          background: "#fff",
          borderRadius: 16,
          minHeight: 320,
          boxShadow: "0 2px 8px rgba(23,76,143,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#64748b",
          fontSize: 20,
          fontWeight: 500,
        }}
      >
        (Biểu đồ/thống kê sẽ hiển thị ở đây)
      </div>
    </SidebarLayout>
  );
}

export default StaffDashboard;
