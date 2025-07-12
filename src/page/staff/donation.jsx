import React, { useEffect, useState } from "react";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";
import { Link } from "react-router-dom";
// XÓA: import Modal from 'react-modal';

function StaffDonation() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = () => {
    setLoading(true);
    api
      .get("/donation")
      .then((res) => {
        setDonations(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải dữ liệu lịch sử hiến máu.");
        setLoading(false);
      });
  };

  const handleApprove = async (donation) => {
    if (!window.confirm("Chuyển trạng thái đơn sang 'Found'?")) return;
    setUpdatingId(donation.donationId);
    try {
      const updated = { ...donation, status: "Found" };
      await api.put(`/donation/${donation.donationId}`, updated);
      fetchDonations();
      alert(
        "Đã chuyển trạng thái đơn sang 'Found'. Khách hàng có thể hoàn tất hiến máu."
      );
    } finally {
      setUpdatingId(null);
    }
  };
  const handleReject = async (donation) => {
    if (!window.confirm("Hủy đơn này?")) return;
    setUpdatingId(donation.donationId);
    try {
      const updated = { ...donation, status: "Cancel" };
      await api.put(`/donation/${donation.donationId}`, updated);
      fetchDonations();
      alert("Đã hủy đơn hiến máu.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <SidebarLayout title="Xử lý đơn hiến máu" isStaff>
      <div style={{ padding: 32 }}>
        <h2 style={{ color: "#174c8f", marginBottom: 24 }}>
          Xử lý đơn hiến máu các thành viên
        </h2>
        {loading ? (
          <div>Đang tải...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
              borderRadius: 12,
            }}
          >
            <thead style={{ background: "#174c8f", color: "#fff" }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Thành viên</th>
                <th style={thStyle}>Bệnh viện</th>
                <th style={thStyle}>Ngày hiến</th>
                <th style={thStyle}>Ghi chú</th>
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.donationId} style={{ background: "#f9fafb" }}>
                  <td style={tdStyle}>{d.donationId}</td>
                  <td style={tdStyle}>
                    {d.member?.fullName || d.member?.memberId || ""}
                  </td>
                  <td style={tdStyle}>
                    {d.location?.name || d.location?.locationId || ""}
                  </td>
                  <td style={tdStyle}>{d.date}</td>
                  <td style={tdStyle}>{d.notes}</td>
                  <td style={tdStyle}>{d.status}</td>
                  <td style={tdStyle}>
                    <Link
                      to={`/staff/donation/${d.donationId}`}
                      style={{
                        color: "#1976d2",
                        textDecoration: "underline",
                        marginRight: 8,
                      }}
                    >
                      Xem chi tiết
                    </Link>
                    {(d.status === "Pending" ||
                      d.status === "Chờ duyệt" ||
                      d.status === "Processing" ||
                      d.status === "Đang xử lý") && (
                      <>
                        <button
                          onClick={() => handleApprove(d)}
                          disabled={updatingId === d.donationId}
                          style={{
                            background: "#388e3c",
                            color: "#fff",
                            border: "none",
                            borderRadius: 8,
                            padding: "6px 14px",
                            marginRight: 8,
                            cursor:
                              updatingId === d.donationId
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          {updatingId === d.donationId
                            ? "Đang xử lý..."
                            : "Chuyển sang Found"}
                        </button>
                        <button
                          onClick={() => handleReject(d)}
                          disabled={updatingId === d.donationId}
                          style={{
                            background: "#d32f2f",
                            color: "#fff",
                            border: "none",
                            borderRadius: 8,
                            padding: "6px 14px",
                            cursor:
                              updatingId === d.donationId
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          {updatingId === d.donationId
                            ? "Đang hủy..."
                            : "Hủy đơn"}
                        </button>
                      </>
                    )}
                    {(d.status === "Completed" || d.status === "Đã hoàn tất") &&
                      null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </SidebarLayout>
  );
}

const thStyle = { padding: "10px 8px", fontWeight: 600 };
const tdStyle = { padding: "10px 8px", textAlign: "center" };
export default StaffDonation;
