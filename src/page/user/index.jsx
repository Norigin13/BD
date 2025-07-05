import Header from "../../components/header";
import Footer from "../../components/footer";
import React, { useState, useEffect } from "react";
import api from "../../config/axios";
import {
  FaUserCircle,
  FaBirthdayCake,
  FaTint,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaVenusMars,
  FaCalendarAlt,
  FaNotesMedical,
  FaMapPin,
  FaSpinner,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [donationStats, setDonationStats] = useState(null);
  const navigate = useNavigate();

  // Lấy thông tin user từ API
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Lấy memberId từ sessionStorage (từ login)
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.memberId) {
        throw new Error("Không tìm thấy thông tin đăng nhập");
      }

      const response = await api.get(`/member/${userInfo.memberId}`);
      const userData = response.data;

      setUser(userData);
      setEditForm(userData);
    } catch (err) {
      console.error("Lỗi khi lấy thông tin profile:", err);
      setError(
        err.response?.data?.message || "Không thể tải thông tin profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật thông tin user
  const updateUserProfile = async () => {
    try {
      setSaving(true);
      setError(null);

      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.memberId) {
        throw new Error("Không tìm thấy thông tin đăng nhập");
      }

      // Loại bỏ password khỏi data gửi lên
      const updateData = { ...editForm };
      delete updateData.password;

      const response = await api.put(
        `/member/${userInfo.memberId}`,
        updateData
      );

      setUser(response.data);
      setIsEditing(false);

      // Cập nhật lại thông tin trong sessionStorage
      const updatedUserInfo = { ...userInfo, ...response.data };
      sessionStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

      // Hiển thị thông báo thành công
      alert("Cập nhật thông tin thành công!");
    } catch (err) {
      console.error("Lỗi khi cập nhật profile:", err);
      setError(err.response?.data?.message || "Không thể cập nhật thông tin");
    } finally {
      setSaving(false);
    }
  };

  // Lấy thống kê hiến máu
  const fetchDonationStats = async () => {
    try {
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.memberId) return;

      const response = await api.get(
        `/member/${userInfo.memberId}/donations/stats`
      );
      setDonationStats(response.data);
    } catch (err) {
      console.error("Lỗi khi lấy thống kê hiến máu:", err);
      // Không set fallback data, để null
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (user) {
      fetchDonationStats();
    }
  }, [user]);

  const handleEdit = () => {
    setEditForm({ ...user });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateUserProfile();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({ ...user });
    setError(null);
  };

  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa có";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getGenderText = (gender) => {
    return gender === "Male" ? "Nam" : gender === "Female" ? "Nữ" : "Khác";
  };

  const getBloodTypeColor = (bloodType) => {
    const colors = {
      "O+": "#d32f2f",
      "O-": "#c62828",
      "A+": "#1976d2",
      "A-": "#1565c0",
      "B+": "#388e3c",
      "B-": "#2e7d32",
      "AB+": "#7b1fa2",
      "AB-": "#6a1b9a",
    };
    return colors[bloodType] || "#666";
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
    window.location.reload(); // reload để reset state toàn app nếu cần
  };

  if (loading) {
    return (
      <>
        <Header hideAuth />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <FaSpinner
            style={{
              fontSize: 32,
              color: "#174c8f",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ color: "#666" }}>Đang tải thông tin profile...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error && !user) {
    return (
      <>
        <Header hideAuth />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <p style={{ color: "#d32f2f" }}>{error}</p>
          <button
            onClick={fetchUserProfile}
            style={{
              background: "#174c8f",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Thử lại
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header hideAuth />
      <div
        style={{
          maxWidth: 600,
          margin: "40px auto",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 24px rgba(23,76,143,0.10)",
          padding: "36px 28px",
          color: "#174c8f",
        }}
      >
        {/* Header Profile */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 64, color: "#d32f2f", marginBottom: 12 }}>
            <FaUserCircle />
          </div>
          <h1 style={{ color: "#d32f2f", marginBottom: 8 }}>Hồ sơ cá nhân</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: "#ffebee",
              color: "#d32f2f",
              padding: "12px 16px",
              borderRadius: 8,
              marginBottom: 24,
              border: "1px solid #ffcdd2",
            }}
          >
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              style={{
                background: "#174c8f",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              <FaEdit /> Chỉnh sửa
            </button>
          ) : (
            <div
              style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}
            >
              <button
                onClick={handleCancel}
                disabled={saving}
                style={{
                  background: "#f3f4f6",
                  color: "#666",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 20px",
                  cursor: saving ? "not-allowed" : "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 16,
                  opacity: saving ? 0.6 : 1,
                }}
              >
                <FaTimes /> Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  background: "#388e3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 20px",
                  cursor: saving ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  opacity: saving ? 0.6 : 1,
                }}
              >
                {saving ? (
                  <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
                ) : (
                  <FaSave />
                )}
                {saving ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          )}
        </div>

        {/* Profile Information */}
        <div
          style={{
            background: "#f8f9fa",
            borderRadius: 12,
            padding: "24px",
            boxShadow: "0 2px 8px rgba(23,76,143,0.08)",
          }}
        >
          {/* Thông tin cơ bản */}
          <div style={{ marginBottom: 24 }}>
            <h3
              style={{
                color: "#174c8f",
                marginBottom: 16,
                borderBottom: "2px solid #e3f2fd",
                paddingBottom: 8,
              }}
            >
              Thông tin cơ bản
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <FaUserCircle style={{ color: "#174c8f", minWidth: 20 }} />
                <span style={{ fontWeight: 500, minWidth: 80 }}>Họ tên:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.fullName || ""}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: 6,
                      padding: "8px 12px",
                      flex: 1,
                      fontSize: 14,
                    }}
                  />
                ) : (
                  <span style={{ fontWeight: 600 }}>
                    {user?.fullName || "Chưa có"}
                  </span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <FaBirthdayCake style={{ color: "#174c8f", minWidth: 20 }} />
                <span style={{ fontWeight: 500, minWidth: 80 }}>
                  Ngày sinh:
                </span>
                {isEditing ? (
                  <input
                    type="date"
                    value={editForm.dob || ""}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: 6,
                      padding: "8px 12px",
                      flex: 1,
                      fontSize: 14,
                    }}
                  />
                ) : (
                  <span>{formatDate(user?.dob)}</span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <FaVenusMars style={{ color: "#174c8f", minWidth: 20 }} />
                <span style={{ fontWeight: 500, minWidth: 80 }}>
                  Giới tính:
                </span>
                {isEditing ? (
                  <select
                    value={editForm.gender || ""}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: 6,
                      padding: "8px 12px",
                      flex: 1,
                      fontSize: 14,
                    }}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                    <option value="Other">Khác</option>
                  </select>
                ) : (
                  <span>{getGenderText(user?.gender)}</span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <FaTint
                  style={{
                    color: getBloodTypeColor(user?.bloodType),
                    minWidth: 20,
                  }}
                />
                <span style={{ fontWeight: 500, minWidth: 80 }}>Nhóm máu:</span>
                {isEditing ? (
                  <select
                    value={editForm.bloodType || ""}
                    onChange={(e) =>
                      handleInputChange("bloodType", e.target.value)
                    }
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: 6,
                      padding: "8px 12px",
                      flex: 1,
                      fontSize: 14,
                    }}
                  >
                    <option value="">Chọn nhóm máu</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                ) : (
                  <span
                    style={{
                      fontWeight: 600,
                      color: getBloodTypeColor(user?.bloodType),
                    }}
                  >
                    {user?.bloodType || "Chưa có"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div style={{ marginBottom: 24 }}>
            <h3
              style={{
                color: "#174c8f",
                marginBottom: 16,
                borderBottom: "2px solid #e3f2fd",
                paddingBottom: 8,
              }}
            >
              Thông tin liên hệ
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <FaPhoneAlt style={{ color: "#174c8f", minWidth: 20 }} />
                <span style={{ fontWeight: 500, minWidth: 80 }}>
                  Số điện thoại:
                </span>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: 6,
                      padding: "8px 12px",
                      flex: 1,
                      fontSize: 14,
                    }}
                  />
                ) : (
                  <span>{user?.phone || "Chưa có"}</span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <FaEnvelope style={{ color: "#174c8f", minWidth: 20 }} />
                <span style={{ fontWeight: 500, minWidth: 80 }}>Email:</span>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: 6,
                      padding: "8px 12px",
                      flex: 1,
                      fontSize: 14,
                    }}
                  />
                ) : (
                  <span>{user?.email || "Chưa có"}</span>
                )}
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <FaMapMarkerAlt
                  style={{ color: "#174c8f", minWidth: 20, marginTop: 4 }}
                />
                <span style={{ fontWeight: 500, minWidth: 80 }}>Địa chỉ:</span>
                {isEditing ? (
                  <textarea
                    value={editForm.address || ""}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: 6,
                      padding: "8px 12px",
                      flex: 1,
                      fontSize: 14,
                      minHeight: 60,
                      resize: "vertical",
                    }}
                  />
                ) : (
                  <span>{user?.address || "Chưa có"}</span>
                )}
              </div>
            </div>

            {!isEditing && user?.latitude && user?.longitude && (
              <div style={{ marginTop: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <FaMapPin style={{ color: "#174c8f", minWidth: 20 }} />
                  <span style={{ fontWeight: 500, minWidth: 80 }}>Tọa độ:</span>
                  <span style={{ fontSize: 12, color: "#666" }}>
                    {user.latitude}, {user.longitude}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Thông tin hiến máu */}
          <div style={{ marginBottom: 24 }}>
            <h3
              style={{
                color: "#174c8f",
                marginBottom: 16,
                borderBottom: "2px solid #e3f2fd",
                paddingBottom: 8,
              }}
            >
              Thông tin hiến máu
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <FaCalendarAlt style={{ color: "#174c8f", minWidth: 20 }} />
                <span style={{ fontWeight: 500, minWidth: 80 }}>
                  Lần hiến cuối:
                </span>
                <span>{formatDate(user?.lastDonation)}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 500, minWidth: 80 }}>
                  Trạng thái:
                </span>
                <span
                  style={{
                    color: "#388e3c",
                    fontWeight: 600,
                    background: "#e8f5e8",
                    padding: "4px 12px",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                >
                  Đang hoạt động
                </span>
              </div>
            </div>
          </div>

          {/* Ghi chú sức khỏe */}
          <div>
            <h3
              style={{
                color: "#174c8f",
                marginBottom: 16,
                borderBottom: "2px solid #e3f2fd",
                paddingBottom: 8,
              }}
            >
              Ghi chú sức khỏe
            </h3>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <FaNotesMedical
                style={{ color: "#174c8f", minWidth: 20, marginTop: 4 }}
              />
              <span style={{ fontWeight: 500, minWidth: 80 }}>Ghi chú:</span>
              {isEditing ? (
                <textarea
                  value={editForm.healthNotes || ""}
                  onChange={(e) =>
                    handleInputChange("healthNotes", e.target.value)
                  }
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    padding: "8px 12px",
                    flex: 1,
                    fontSize: 14,
                    minHeight: 80,
                    resize: "vertical",
                  }}
                  placeholder="Nhập ghi chú về sức khỏe..."
                />
              ) : (
                <span style={{ lineHeight: 1.5 }}>
                  {user?.healthNotes || "Chưa có ghi chú"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Thống kê hiến máu */}
        {donationStats && (
          <div
            style={{
              background: "#e3f2fd",
              borderRadius: 12,
              padding: "20px",
              marginTop: 24,
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#174c8f", marginBottom: 16 }}>
              Thống kê hiến máu
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
              }}
            >
              <div>
                <div
                  style={{ fontSize: 24, fontWeight: 600, color: "#d32f2f" }}
                >
                  {donationStats.totalDonations || 0}
                </div>
                <div style={{ fontSize: 12, color: "#666" }}>Lần hiến máu</div>
              </div>
              <div>
                <div
                  style={{ fontSize: 24, fontWeight: 600, color: "#1976d2" }}
                >
                  {donationStats.totalBloodVolume || 0}ml
                </div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  Tổng lượng máu
                </div>
              </div>
              <div>
                <div
                  style={{ fontSize: 24, fontWeight: 600, color: "#388e3c" }}
                >
                  {donationStats.joinYear || new Date().getFullYear()}
                </div>
                <div style={{ fontSize: 12, color: "#666" }}>Năm tham gia</div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
