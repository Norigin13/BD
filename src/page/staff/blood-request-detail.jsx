import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";

function StaffBloodRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/blood-request/${id}`)
      .then(res => {
        setRequest(res.data);
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
      await api.post(`/blood-request/${id}/approve`);
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
      await api.post(`/blood-request/${id}/reject`);
      alert("Đã từ chối đơn!");
      navigate("/staff/blood-requests");
    } catch {
      alert("Lỗi khi từ chối đơn!");
    }
    setActionLoading(false);
  };

  return (
    <SidebarLayout title="Chi tiết đơn hiến/nhận máu" isStaff>
      <div style={{ padding: 32, maxWidth: 600, margin: '0 auto' }}>
        {loading ? <div>Đang tải...</div> : error ? <div style={{color:'red'}}>{error}</div> : request && (
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(23,76,143,0.07)', padding: 32 }}>
            <h2 style={{ color: request.is_emergency ? '#d32f2f' : '#174c8f', marginBottom: 18 }}>
              Thông tin đơn #{request.requestId} {request.is_emergency ? '(KHẨN CẤP)' : ''}
            </h2>
            <div><b>Họ tên:</b> {request.fullName}</div>
            <div><b>Số điện thoại:</b> {request.phone || request.contact}</div>
            <div><b>Nhóm máu:</b> {request.bloodType}</div>
            <div><b>Bệnh viện:</b> {request.location_name || request.location_id}</div>
            <div><b>Ngày cần máu:</b> {request.needed_date}</div>
            <div><b>Thành phần máu:</b> {request.componentName || request.component_id}</div>
            <div><b>Ghi chú:</b> {request.note}</div>
            <div><b>Loại:</b> {request.is_emergency ? <span style={{color:'#d32f2f'}}>Khẩn cấp</span> : 'Thường'}</div>
            <div><b>Trạng thái:</b> {request.status || 'Chờ duyệt'}</div>
            <div style={{marginTop: 28, display: 'flex', gap: 18}}>
              {request.status === 'pending' || !request.status ? <>
                <button onClick={handleApprove} disabled={actionLoading} style={{background:'#2563eb',color:'#fff',padding:'10px 24px',border:'none',borderRadius:8,fontWeight:600,cursor:'pointer'}}>Phê duyệt</button>
                <button onClick={handleReject} disabled={actionLoading} style={{background:'#d32f2f',color:'#fff',padding:'10px 24px',border:'none',borderRadius:8,fontWeight:600,cursor:'pointer'}}>Từ chối</button>
              </> : <span>Đơn đã được xử lý.</span>}
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}

export default StaffBloodRequestDetail; 