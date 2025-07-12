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

function UserProfile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [donationStats, setDonationStats] = useState(null);

  // State cho tab
  const [activeTab, setActiveTab] = useState("profile"); // profile | history | current
  // State cho danh sách đơn
  const [donations, setDonations] = useState([]);
  const [bloodRequests, setBloodRequests] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(false);
  const [loadingBloodRequests, setLoadingBloodRequests] = useState(false);
  const [updatingDonationId, setUpdatingDonationId] = useState(null);
  const [bloodRequestProcesses, setBloodRequestProcesses] = useState([]);

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
    } catch {
      // XÓA biến err không dùng
      setError("Không thể tải thông tin profile");
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
      setError("Không thể cập nhật thông tin");
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
    } catch {
      // Không set fallback data, để null
    }
  };

  // Fetch danh sách đơn hiến máu
  const fetchDonations = async () => {
    try {
      setLoadingDonations(true);
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.memberId) return;
      const res = await api.get(`/donation?memberId=${userInfo.memberId}`);
      setDonations(res.data);
    } catch {
      // Có thể bổ sung thông báo lỗi
    } finally {
      setLoadingDonations(false);
    }
  };
  // Fetch danh sách đơn nhận máu
  const fetchBloodRequests = async () => {
    try {
      setLoadingBloodRequests(true);
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.memberId) return;
      const res = await api.get(`/blood-request?memberId=${userInfo.memberId}`);
      setBloodRequests(res.data);
    } catch {
      // Có thể bổ sung thông báo lỗi
    } finally {
      setLoadingBloodRequests(false);
    }
  };

  const fetchBloodRequestProcesses = async () => {
    try {
      const res = await api.get("/blood-request-process");
      setBloodRequestProcesses(res.data);
    } catch {
      // Có thể bổ sung thông báo lỗi
    }
  };

  // Gọi fetch khi chuyển tab
  useEffect(() => {
    if (activeTab === "history" || activeTab === "current") {
      fetchDonations();
      fetchBloodRequests();
      fetchBloodRequestProcesses();
    }
  }, [activeTab]);

  // Hàm cập nhật trạng thái đơn hiến máu
  const updateDonationStatus = async (donation, newStatus) => {
    try {
      setUpdatingDonationId(donation.donationId);
      const updated = { ...donation, status: newStatus };
      await api.put(`/donation/${donation.donationId}`, updated);
      fetchDonations();
      alert("Cập nhật trạng thái thành công!");
    } catch (err) {
      alert(
        "Có lỗi khi cập nhật trạng thái!\n" +
          (err?.response?.data?.message ||
            JSON.stringify(err?.response?.data) ||
            err.message)
      );
      console.error("Update donation error:", err);
    } finally {
      setUpdatingDonationId(null);
    }
  };

  const handleApproveDonation = async (donationId) => {
    if (!window.confirm("Bạn xác nhận muốn gửi đơn này để staff phê duyệt?"))
      return;
    try {
      setUpdatingDonationId(donationId);
      // Lấy object đơn
      const res = await api.get(`/donation/${donationId}`);
      await updateDonationStatus(res.data, "Processing");
    } catch (err) {
      alert(
        "Có lỗi khi gửi đơn!\n" +
          (err?.response?.data?.message ||
            JSON.stringify(err?.response?.data) ||
            err.message)
      );
      setUpdatingDonationId(null);
    }
  };
  const handleCancelDonation = async (donationId) => {
    if (!window.confirm("Bạn chắc chắn muốn hủy đơn này?")) return;
    try {
      setUpdatingDonationId(donationId);
      const res = await api.get(`/donation/${donationId}`);
      await updateDonationStatus(res.data, "Cancelled");
    } catch (err) {
      alert(
        "Có lỗi khi hủy đơn!\n" +
          (err?.response?.data?.message ||
            JSON.stringify(err?.response?.data) ||
            err.message)
      );
      setUpdatingDonationId(null);
    }
  };
  const handleCompleteDonation = async (donationId) => {
    if (!window.confirm("Bạn chắc chắn đã hoàn tất hiến máu cho đơn này?"))
      return;
    try {
      setUpdatingDonationId(donationId);
      const res = await api.get(`/donation/${donationId}`);
      await updateDonationStatus(res.data, "Complete");
      alert(
        "Cảm ơn bạn đã hiến máu! Staff sẽ được thông báo về việc hoàn tất."
      );
    } catch (err) {
      alert(
        "Có lỗi khi cập nhật trạng thái!\n" +
          (err?.response?.data?.message ||
            JSON.stringify(err?.response?.data) ||
            err.message)
      );
      setUpdatingDonationId(null);
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

  // Tách phần nội dung từng tab ra biến JSX
  const profileContent = (
    <>
      {/* Thông tin cá nhân giữ nguyên như cũ */}
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
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  padding: "8px 12px",
                  fontSize: 14,
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
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
            <span style={{ fontWeight: 500, minWidth: 80 }}>Ngày sinh:</span>
            {isEditing ? (
              <input
                type="date"
                value={editForm.dob || ""}
                onChange={(e) => handleInputChange("dob", e.target.value)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  padding: "8px 12px",
                  fontSize: 14,
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              />
            ) : (
              <span>{formatDate(user?.dob)}</span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <FaVenusMars style={{ color: "#174c8f", minWidth: 20 }} />
            <span style={{ fontWeight: 500, minWidth: 80 }}>Giới tính:</span>
            {isEditing ? (
              <select
                value={editForm.gender || ""}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  padding: "8px 12px",
                  fontSize: 14,
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
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
                onChange={(e) => handleInputChange("bloodType", e.target.value)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  padding: "8px 12px",
                  fontSize: 14,
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
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
                  fontSize: 14,
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
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
                  fontSize: 14,
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              />
            ) : (
              <span>{user?.email || "Chưa có"}</span>
            )}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <FaMapMarkerAlt
              style={{ color: "#174c8f", minWidth: 20, marginTop: 4 }}
            />
            <span style={{ fontWeight: 500, minWidth: 80 }}>Địa chỉ:</span>
            {isEditing ? (
              <textarea
                value={editForm.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  padding: "8px 12px",
                  fontSize: 14,
                  minHeight: 60,
                  resize: "vertical",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
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
            <span style={{ fontWeight: 500, minWidth: 80 }}>Trạng thái:</span>
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
              onChange={(e) => handleInputChange("healthNotes", e.target.value)}
              style={{
                border: "1px solid #ddd",
                borderRadius: 6,
                padding: "8px 12px",
                fontSize: 14,
                minHeight: 80,
                resize: "vertical",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
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
    </>
  );

  const historyContent = (
    <div style={{ marginTop: 24 }}>
      <h3 style={{ color: "#174c8f", marginBottom: 16 }}>Lịch sử hiến máu</h3>
      {loadingDonations ? (
        <div>Đang tải...</div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 32,
            boxShadow: "0 2px 8px rgba(23,76,143,0.08)",
          }}
        >
          <thead style={{ background: "#174c8f", color: "#fff" }}>
            <tr>
              <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 60 }}>ID</th>
              <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 200, width: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Bệnh viện</th>
              <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 120 }}>Ngày hiến/nhận</th>
              <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 140 }}>Ghi chú</th>
              <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 120 }}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {donations
              .filter(
                (d) => d.status === "Completed" || d.status === "Đã hoàn tất"
              )
              .map((d) => (
                <tr key={d.donationId} style={{ background: "#f9fafb" }}>
                  <td style={{ textAlign: "center" }}>{d.donationId}</td>
                  <td style={{ textAlign: "center", padding: "10px 8px", wordBreak: "break-word", maxWidth: 200 }}>{d.location?.name || d.location?.locationId || ""}</td>
                  <td style={{ textAlign: "center" }}>{d.date}</td>
                  <td style={{ textAlign: "center", wordBreak: "break-word", maxWidth: 180 }}>{d.notes}</td>
                  <td style={{ textAlign: "center" }}>{d.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <h3 style={{ color: "#174c8f", margin: "32px 0 16px" }}>
        Lịch sử nhận máu
      </h3>
      {loadingBloodRequests ? (
        <div>Đang tải...</div>
      ) : bloodRequests.length === 0 ? (
        <div style={{ color: "#888", textAlign: "center", margin: "24px 0" }}>
          Chưa có đơn nhận máu nào.
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              minWidth: 520,
              borderCollapse: "separate",
              borderSpacing: 0,
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 2px 8px rgba(23,76,143,0.08)",
              overflow: "hidden",
            }}
          >
            <thead style={{ background: "#174c8f", color: "#fff" }}>
              <tr>
                <th
                  style={{
                    padding: "12px 8px",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    padding: "12px 8px",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Bệnh viện
                </th>
                <th
                  style={{
                    padding: "12px 8px",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Ngày nhận
                </th>
                <th
                  style={{
                    padding: "12px 8px",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Ghi chú
                </th>
                <th
                  style={{
                    padding: "12px 8px",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {bloodRequests.map((r, idx) => {
                // Tìm process mới nhất cho request này
                const processes = bloodRequestProcesses.filter(
                  (p) => p.bloodRequest?.requestId === r.requestId
                );
                const latestProcess = processes.length
                  ? processes.reduce((a, b) =>
                      a.processId > b.processId ? a : b
                    )
                  : null;
                const processStatus = latestProcess?.status || r.status;
                return (
                  <tr
                    key={r.requestId}
                    style={{
                      background: idx % 2 === 0 ? "#f9fafb" : "#fff",
                      transition: "background 0.2s",
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 8px",
                        textAlign: "center",
                        fontWeight: 500,
                      }}
                    >
                      {r.requestId}
                    </td>
                    <td style={{ padding: "10px 8px", textAlign: "center" }}>
                      {r.location?.name ||
                        r.location?.locationId ||
                        r.hospital ||
                        ""}
                    </td>
                    <td style={{ padding: "10px 8px", textAlign: "center" }}>
                      {r.date || r.neededDate || ""}
                    </td>
                    <td
                      style={{
                        padding: "10px 8px",
                        textAlign: "center",
                        maxWidth: 180,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.notes || r.note || ""}
                    </td>
                    <td style={{ padding: "10px 8px", textAlign: "center" }}>
                      {processStatus === "Complete" ||
                      processStatus === "Completed" ? (
                        <>
                          <span
                            style={{
                              color: "#388e3c",
                              fontWeight: 600,
                              background: "#e8f5e8",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}
                          >
                            Hoàn thành
                          </span>
                          <div
                            style={{
                              fontSize: 11,
                              color: "#666",
                              marginTop: 2,
                            }}
                          >
                            {processStatus}
                          </div>
                        </>
                      ) : processStatus === "Pending" ||
                        processStatus === "Chờ duyệt" ? (
                        <>
                          <span
                            style={{
                              color: "#1976d2",
                              fontWeight: 600,
                              background: "#e3f2fd",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}
                          >
                            Chờ duyệt
                          </span>
                          <div
                            style={{
                              fontSize: 11,
                              color: "#666",
                              marginTop: 2,
                            }}
                          >
                            {processStatus}
                          </div>
                        </>
                      ) : processStatus === "Approved" ||
                        processStatus === "Đã duyệt" ? (
                        <>
                          <span
                            style={{
                              color: "#fbbf24",
                              fontWeight: 600,
                              background: "#fff8e1",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}
                          >
                            Đã duyệt
                          </span>
                          <div
                            style={{
                              fontSize: 11,
                              color: "#666",
                              marginTop: 2,
                            }}
                          >
                            {processStatus}
                          </div>
                        </>
                      ) : processStatus === "Cancelled" ||
                        processStatus === "Đã hủy" ? (
                        <>
                          <span
                            style={{
                              color: "#d32f2f",
                              fontWeight: 600,
                              background: "#ffebee",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}
                          >
                            Đã hủy
                          </span>
                          <div
                            style={{
                              fontSize: 11,
                              color: "#666",
                              marginTop: 2,
                            }}
                          >
                            {processStatus}
                          </div>
                        </>
                      ) : (
                        <span
                          style={{
                            color: "#666",
                            fontWeight: 600,
                            background: "#f3f4f6",
                            borderRadius: 8,
                            padding: "4px 12px",
                            fontSize: 13,
                            display: "inline-block",
                          }}
                        >
                          {processStatus}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const currentContent = (
    <div style={{ marginTop: 24 }}>
      <h3 style={{ color: "#174c8f", marginBottom: 16 }}>
        Đơn hiến máu hiện tại
      </h3>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        {loadingDonations ? (
          <div>Đang tải...</div>
        ) : (
          <table
            style={{
              width: "100%",
              maxWidth: "100%",
              borderCollapse: "collapse",
              background: "#fff",
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 24,
              boxShadow: "0 2px 8px rgba(23,76,143,0.08)",
            }}
          >
            <thead style={{ background: "#174c8f", color: "#fff" }}>
              <tr>
                <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 60, width: 60 }}>ID</th>
                <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 170, width: 170, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Bệnh viện</th>
                <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 120, width: 120 }}>Ngày hiến</th>
                <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 140, width: 140 }}>Ghi chú</th>
                <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 120, width: 120 }}>Trạng thái</th>
                <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 120, width: 120 }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {donations
                .filter(
                  (d) =>
                    d.status === "Pending" ||
                    d.status === "Processing" ||
                    d.status === "Found" ||
                    d.status === "Cancel" ||
                    d.status === "Complete" ||
                    d.status === "Chờ duyệt" ||
                    d.status === "Đang xử lý" ||
                    d.status === "Đã tìm thấy" ||
                    d.status === "Đã hủy" ||
                    d.status === "Đã hoàn tất"
                )
                .map((d) => (
                  <tr key={d.donationId} style={{ background: "#f9fafb" }}>
                    <td style={{ textAlign: "center", verticalAlign: "middle", padding: "10px 8px", minWidth: 60, width: 60 }}>{d.donationId}</td>
                    <td style={{ textAlign: "center", verticalAlign: "middle", padding: "10px 8px", minWidth: 170, width: 170, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.location?.name || d.location?.locationId || ""}</td>
                    <td style={{ textAlign: "center", verticalAlign: "middle", padding: "10px 8px", minWidth: 120, width: 120 }}>{d.date}</td>
                    <td style={{ textAlign: "center", verticalAlign: "middle", padding: "10px 8px", minWidth: 140, width: 140, wordBreak: "break-word", maxWidth: 140 }}>{d.notes}</td>
                    <td style={{ textAlign: "center", verticalAlign: "middle", padding: "10px 8px", minWidth: 120, width: 120 }}>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {d.status === "Processing" || d.status === "Đang xử lý" ? (
                          <span
                            style={{
                              color: "#1976d2",
                              fontWeight: 600,
                              background: "#e3f2fd",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}
                          >
                            Đang xử lý
                          </span>
                        ) : d.status === "Found" || d.status === "Đã tìm thấy" ? (
                          <span
                            style={{
                              color: "#fbbf24",
                              fontWeight: 600,
                              background: "#fff8e1",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}
                          >
                            Đã tìm thấy
                          </span>
                        ) : d.status === "Cancel" || d.status === "Đã hủy" ? (
                          <span
                            style={{
                              color: "#d32f2f",
                              fontWeight: 600,
                              background: "#ffebee",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}
                          >
                            Đã hủy
                          </span>
                        ) : d.status === "Complete" || d.status === "Đã hoàn tất" ? (
                          <span
                            style={{
                              color: "#388e3c",
                              fontWeight: 600,
                              background: "#e8f5e8",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}
                          >
                            Đã hoàn tất
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "#666",
                              fontWeight: 600,
                              background: "#f3f4f6",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}
                          >
                            {d.status}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ textAlign: "center", verticalAlign: "middle", padding: "10px 8px", minWidth: 120, width: 120 }}>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
                        {d.status === "Pending" || d.status === "Chờ duyệt" ? (
                          <>
                            <button
                              onClick={() => handleApproveDonation(d.donationId)}
                              disabled={updatingDonationId === d.donationId}
                              style={{
                                background: "#388e3c",
                                color: "#fff",
                                border: "none",
                                borderRadius: 8,
                                width: 90,
                                height: 36,
                                fontSize: 15,
                                fontWeight: 500,
                                cursor:
                                  updatingDonationId === d.donationId
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              {updatingDonationId === d.donationId
                                ? "Đang gửi..."
                                : "Gửi đơn"}
                            </button>
                            <button
                              onClick={() => handleCancelDonation(d.donationId)}
                              disabled={updatingDonationId === d.donationId}
                              style={{
                                background: "#d32f2f",
                                color: "#fff",
                                border: "none",
                                borderRadius: 8,
                                width: 90,
                                height: 36,
                                fontSize: 15,
                                fontWeight: 500,
                                cursor:
                                  updatingDonationId === d.donationId
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              {updatingDonationId === d.donationId
                                ? "Đang hủy..."
                                : "Hủy"}
                            </button>
                          </>
                        ) : d.status === "Found" || d.status === "Đã tìm thấy" ? (
                          <button
                            onClick={() => handleCompleteDonation(d.donationId)}
                            disabled={updatingDonationId === d.donationId}
                            style={{
                              background: "#1976d2",
                              color: "#fff",
                              border: "none",
                              borderRadius: 8,
                              padding: "6px 14px",
                              cursor:
                                updatingDonationId === d.donationId
                                  ? "not-allowed"
                                  : "pointer",
                              fontWeight: 500,
                            }}
                          >
                            {updatingDonationId === d.donationId
                              ? "Đang cập nhật..."
                              : "Đã hoàn tất hiến máu"}
                          </button>
                        ) : d.status === "Processing" || d.status === "Đang xử lý" ? (
                          <span
                            style={{
                              color: "#666",
                              fontSize: 12,
                              fontStyle: "italic",
                            }}
                          >
                            Đang chờ staff xử lý
                          </span>
                        ) : d.status === "Cancel" || d.status === "Đã hủy" ? (
                          <span
                            style={{
                              color: "#d32f2f",
                              fontSize: 12,
                              fontStyle: "italic",
                            }}
                          >
                            Đơn đã bị hủy
                          </span>
                        ) : d.status === "Complete" || d.status === "Đã hoàn tất" ? (
                          <span
                            style={{
                              color: "#388e3c",
                              fontSize: 12,
                              fontStyle: "italic",
                            }}
                          >
                            Đã hoàn tất hiến máu
                          </span>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <h3 style={{ color: "#174c8f", margin: "32px 0 16px" }}>
        Đơn nhận máu hiện tại
      </h3>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        {loadingBloodRequests ? (
          <div>Đang tải...</div>
        ) : (
          <table
            style={{
              width: "100%",
              maxWidth: "100%",
              borderCollapse: "collapse",
              background: "#fff",
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 24,
              boxShadow: "0 2px 8px rgba(23,76,143,0.08)",
            }}
          >
            <thead style={{ background: "#174c8f", color: "#fff" }}>
              <tr>
                <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 60, width: 60 }}>ID</th>
                <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 170, width: 170, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Bệnh viện</th>
                <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 120, width: 120 }}>Ngày nhận</th>
                <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 140, width: 140 }}>Ghi chú</th>
                <th style={{ textAlign: "center", padding: "12px 8px", minWidth: 120, width: 120 }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {bloodRequests
                .map((r) => {
                  // Tìm process mới nhất cho request này
                  const processes = bloodRequestProcesses.filter(
                    (p) => p.bloodRequest?.requestId === r.requestId
                  );
                  const latestProcess = processes.length
                    ? processes.reduce((a, b) => (a.processId > b.processId ? a : b))
                    : null;
                  const processStatus = latestProcess?.status || r.status;
                  // Lọc các trạng thái hiện tại (đang xử lý, đã tìm thấy, chưa hoàn thành/hủy)
                  if ([
                    "Pending", "Approved", "Found", "Processing", "Chờ duyệt", "Đã duyệt", "Đã tìm thấy"
                  ].includes(processStatus)) {
                    return (
                      <tr key={r.requestId} style={{ background: "#f9fafb" }}>
                        <td style={{ textAlign: "center", padding: "10px 8px", minWidth: 60, width: 60 }}>{r.requestId}</td>
                        <td style={{ textAlign: "center", padding: "10px 8px", minWidth: 170, width: 170, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.location?.name || r.location?.locationId || r.hospital || ""}</td>
                        <td style={{ textAlign: "center", padding: "10px 8px", minWidth: 120, width: 120 }}>{r.date || r.neededDate || ""}</td>
                        <td style={{ textAlign: "center", padding: "10px 8px", minWidth: 140, width: 140 }}>{r.notes || r.note || ""}</td>
                        <td style={{ textAlign: "center", padding: "10px 8px", minWidth: 120, width: 120 }}>
                          {processStatus === "Pending" || processStatus === "Chờ duyệt" ? (
                            <span style={{
                              color: "#1976d2",
                              fontWeight: 600,
                              background: "#e3f2fd",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}>
                              Chờ duyệt
                            </span>
                          ) : processStatus === "Approved" || processStatus === "Đã duyệt" ? (
                            <span style={{
                              color: "#388e3c",
                              fontWeight: 600,
                              background: "#e8f5e8",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}>
                              Đã duyệt
                            </span>
                          ) : processStatus === "Found" || processStatus === "Đã tìm thấy" ? (
                            <span style={{
                              color: "#fbbf24",
                              fontWeight: 600,
                              background: "#fff8e1",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}>
                              Đã tìm thấy
                            </span>
                          ) : processStatus === "Processing" || processStatus === "Đang xử lý" ? (
                            <span style={{
                              color: "#1976d2",
                              fontWeight: 600,
                              background: "#e3f2fd",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}>
                              Đang xử lý
                            </span>
                          ) : processStatus === "Cancel" || processStatus === "Đã hủy" ? (
                            <span style={{
                              color: "#d32f2f",
                              fontWeight: 600,
                              background: "#ffebee",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}>
                              Đã hủy
                            </span>
                          ) : processStatus === "Complete" || processStatus === "Đã hoàn tất" ? (
                            <span style={{
                              color: "#388e3c",
                              fontWeight: 600,
                              background: "#e8f5e8",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}>
                              Hoàn thành
                            </span>
                          ) : (
                            <span style={{
                              color: "#666",
                              fontWeight: 600,
                              background: "#f3f4f6",
                              borderRadius: 8,
                              padding: "4px 12px",
                              fontSize: 13,
                              display: "inline-block",
                            }}>
                              {processStatus}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Header hideAuth />
      <div
        style={{
          maxWidth: 1000,
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
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            {/* Chỉ hiện nút Chỉnh sửa khi ở tab profile */}
            {!isEditing && activeTab === "profile" && (
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
            )}
            {/* Khi ở tab history hoặc current thì hiện nút Quay về hồ sơ */}
            {(activeTab === "history" || activeTab === "current") && (
              <button
                onClick={() => setActiveTab("profile")}
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
                Xem thông tin
              </button>
            )}
            <button
              onClick={() => setActiveTab("history")}
              style={{
                background: activeTab === "history" ? "#d32f2f" : "#f3f4f6",
                color: activeTab === "history" ? "#fff" : "#174c8f",
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
              <FaNotesMedical /> Lịch sử hiến/nhận máu
            </button>
            <button
              onClick={() => setActiveTab("current")}
              style={{
                background: activeTab === "current" ? "#d32f2f" : "#f3f4f6",
                color: activeTab === "current" ? "#fff" : "#174c8f",
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
              <FaMapPin /> Đơn hiện tại
            </button>
          </div>
          {isEditing && (
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "flex-end",
                marginTop: 12,
              }}
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
          {activeTab === "profile" && profileContent}
          {activeTab === "history" && historyContent}
          {activeTab === "current" && currentContent}
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
