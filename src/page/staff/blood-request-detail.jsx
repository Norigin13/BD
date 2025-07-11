import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";

function StaffBloodRequestDetail() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [process, setProcess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [processReady, setProcessReady] = useState(false);
  const [creatingProcess, setCreatingProcess] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const statusOptions = [
    "Processing",
    "Found",
    "Complete",
    "Cancel",
  ];

  // Hàm load process mới nhất cho requestId
  const loadLatestProcess = async () => {
    const procRes = await api.get(`/blood-request-process`);
    const allProc = Array.isArray(procRes.data)
      ? procRes.data.filter(p => p.bloodRequest?.requestId == id)
      : [];
    const foundProc = allProc.length
      ? allProc.reduce((a, b) => (a.processId > b.processId ? a : b))
      : null;
    setProcess(foundProc);
    setProcessReady(true);
    return foundProc;
  };

  useEffect(() => {
    setLoading(true);
    setProcessReady(false);
    setCreatingProcess(false);
    let loadedRequest = null;
    api.get(`/blood-request/${id}`)
      .then(async (reqRes) => {
        loadedRequest = reqRes.data;
        // Luôn load lại process mới nhất
        const procRes = await api.get(`/blood-request-process`);
        const allProc = Array.isArray(procRes.data)
          ? procRes.data.filter(p => p.bloodRequest?.requestId == id)
          : [];
        const foundProc = allProc.length
          ? allProc.reduce((a, b) => (a.processId > b.processId ? a : b))
          : null;
        setRequest(loadedRequest);
        setProcess(foundProc);
        setProcessReady(true);
        setLoading(false);
        // Nếu chưa có process nào thì mới tạo
        if (!foundProc) {
          setCreatingProcess(true);
          await api.post(`/blood-request-process`, {
            bloodRequest: loadedRequest,
            matchedMember: null,
            status: "Processing",
            updatedAt: new Date().toISOString(),
          });
          // Sau khi tạo mới, reload lại process
          const procRes2 = await api.get(`/blood-request-process`);
          const allProc2 = Array.isArray(procRes2.data)
            ? procRes2.data.filter(p => p.bloodRequest?.requestId == id)
            : [];
          const foundProc2 = allProc2.length
            ? allProc2.reduce((a, b) => (a.processId > b.processId ? a : b))
            : null;
          setProcess(foundProc2);
          setCreatingProcess(false);
          setSelectedStatus("Processing");
        } else {
          setSelectedStatus(foundProc.status);
        }
      })
      .catch(() => {
        setError("Không thể tải chi tiết đơn.");
        setLoading(false);
      });
  }, [id]);

  const handleConfirm = async () => {
    setActionLoading(true);
    const foundProc = await loadLatestProcess();
    if (!foundProc) return setActionLoading(false);
    if (selectedStatus === "Found") {
      // Cập nhật trạng thái sang Found, sau đó điều hướng sang kho máu
      await api.put(`/blood-request-process/${foundProc.processId}`, {
        status: "Found",
      });
      await api.put(`/blood-request/${id}`, {
        ...request,
        status: "Found",
      });
      alert("Chuyển sang trạng thái 'Found'. Vui lòng cập nhật kho máu!");
      window.location.href = "/staff/blood-inventory"; // Điều hướng sang kho máu
      setActionLoading(false);
      return;
    }
    if (selectedStatus === "Complete") {
      await api.put(`/blood-request-process/${foundProc.processId}`, {
        status: "Complete",
      });
      await api.put(`/blood-request/${id}`, {
        ...request,
        status: "Complete",
      });
      alert("Đã chuyển sang trạng thái Complete!");
      await loadLatestProcess();
      setActionLoading(false);
      return;
    }
    if (selectedStatus === "Processing") {
      await api.put(`/blood-request-process/${foundProc.processId}`, {
        status: "Processing",
      });
      await api.put(`/blood-request/${id}`, {
        ...request,
        status: "Processing",
      });
      alert("Đã chuyển sang trạng thái Processing!");
      await loadLatestProcess();
      setActionLoading(false);
      return;
    }
    setActionLoading(false);
  };

  const handleCancel = async () => {
    setActionLoading(true);
    const foundProc = await loadLatestProcess();
    if (!foundProc) return setActionLoading(false);
    await api.put(`/blood-request-process/${foundProc.processId}`, {
      status: "Cancel",
    });
    await api.put(`/blood-request/${id}`, {
      ...request,
      status: "Cancel",
    });
    alert("Đã chuyển sang trạng thái Cancel!");
    await loadLatestProcess();
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
          <b>Trạng thái xử lý:</b>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            disabled={process?.status === "Complete" || process?.status === "Cancel"}
            style={{ marginLeft: 8, padding: 4, borderRadius: 4 }}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: 28, display: "flex", gap: 18 }}>
          {process && processReady && !creatingProcess && process.status !== "Complete" && process.status !== "Cancel" && (
            <>
              <button
                onClick={handleConfirm}
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
                Confirm
              </button>
              <button
                onClick={handleCancel}
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
                Cancel
              </button>
            </>
          )}
          {process && processReady && (creatingProcess || loading) && (
            <span>Đang tải trạng thái xử lý...</span>
          )}
          {process && processReady && !creatingProcess && (process.status === "Complete" || process.status === "Cancel") && (
            <span>Đơn đã được xử lý.</span>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}

export default StaffBloodRequestDetail;
