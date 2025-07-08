import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";

function StaffBloodRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [process, setProcess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get(`/blood-request/${id}`),
      api.get(`/blood-request-process/${id}`),
    ])
      .then(([reqRes, procRes]) => {
        setRequest(reqRes.data);
        setProcess(procRes.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải chi tiết đơn.");
        setLoading(false);
      });
  }, [id]);

  const handleApprove = async () => {
    setActionLoading(true);
    try {
      await api.put(`/blood-request-process/${process.processId}`, {
        status: "Complete",
      });
      alert("Đã phê duyệt đơn thành công!");
      navigate("/staff/blood-requests");
    } catch {
      alert("Lỗi khi phê duyệt đơn!");
    }
    setActionLoading(false);
  };

  const handleReject = async () => {
    setActionLoading(true);
    try {
      await api.put(`/blood-request-process/${process.processId}`, {
        status: "Cancel",
      });
      alert("Đã từ chối đơn!");
      navigate("/staff/blood-requests");
    } catch {
      alert("Lỗi khi từ chối đơn!");
    }
    setActionLoading(false);
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <SidebarLayout title="Chi tiết đơn hiến/nhận máu" isStaff>
      <div style={{ padding: 32, maxWidth: 600, margin: "0 auto" }}>
        <h2>Thông tin đơn #{request.requestId}</h2>
        <div>
          <b>Họ tên:</b> {request.fullName}
        </div>
        <div>
          <b>Số điện thoại:</b> {request.contact}
        </div>
        <div>
          <b>Nhóm máu:</b> {request.bloodType}
        </div>
        <div>
          <b>Bệnh viện:</b> {request.hospital}
        </div>
        <div>
          <b>Ngày cần máu:</b> {request.neededDate}
        </div>
        <div>
          <b>Thành phần máu:</b>{" "}
          {request.component?.name || request.componentId}
        </div>
        <div>
          <b>Ghi chú:</b> {request.note}
        </div>
        <div>
          <b>Loại:</b> {request.isEmergency ? "Khẩn cấp" : "Thường"}
        </div>
        <div>
          <b>Trạng thái xử lý:</b> {process?.status}
        </div>
        <div style={{ marginTop: 28, display: "flex", gap: 18 }}>
          {(process?.status === "Processing" || !process?.status) && (
            <>
              <button
                onClick={handleApprove}
                disabled={actionLoading}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Phê duyệt
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading}
                style={{
                  background: "#d32f2f",
                  color: "#fff",
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Từ chối
              </button>
            </>
          )}
          {(process?.status === "Complete" || process?.status === "Cancel") && (
            <span>Đơn đã được xử lý.</span>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}

export default StaffBloodRequestDetail;
