import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";

function StaffDonationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [showBloodUnit, setShowBloodUnit] = useState(false);
  const [bloodUnitForm, setBloodUnitForm] = useState({
    component: "",
    bloodType: "",
    volumeMl: "",
    location: "",
  });
  const [components, setComponents] = useState([]);
  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const [bloodUnit, setBloodUnit] = useState(null);

  useEffect(() => {
    fetchDetail();
    api
      .get("/blood-component")
      .then((res) => setComponents(res.data))
      .catch(() => setComponents([]));
    // eslint-disable-next-line
  }, [id]);

  // Fetch blood unit theo donationId
  const fetchBloodUnit = async () => {
    try {
      const res = await api.get(
        `/blood-unit?donationId=${donation.donationId}`
      );
      if (Array.isArray(res.data) && res.data.length > 0) {
        setBloodUnit(res.data[0]);
      } else {
        setBloodUnit(null);
      }
    } catch {
      setBloodUnit(null);
    }
  };

  // Sau khi fetchDetail xong, fetch blood unit nếu có donation
  useEffect(() => {
    if (donation && donation.donationId) {
      fetchBloodUnit();
    }
    // eslint-disable-next-line
  }, [donation]); // Nếu warning vẫn còn, thêm fetchBloodUnit vào dependency array: [donation, fetchBloodUnit]

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/donation/${id}`);
      setDonation(res.data);
    } catch {
      setError("Không thể tải chi tiết đơn!");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!window.confirm("Chuyển trạng thái đơn sang 'Approved'?")) return;
    setUpdating(true);
    try {
      await api.put(`/donation/${id}`, { ...donation, status: "Approved" });
      fetchDetail();
      alert(
        "Đã chuyển trạng thái đơn sang 'Approved'. Khách hàng có thể hoàn tất hiến máu."
      );
    } finally {
      setUpdating(false);
    }
  };
  const handleReject = async () => {
    if (!window.confirm("Hủy đơn này?")) return;
    setUpdating(true);
    try {
      await api.put(`/donation/${id}`, { ...donation, status: "Cancel" });
      fetchDetail();
      alert("Đã hủy đơn hiến máu.");
    } finally {
      setUpdating(false);
    }
  };
  const openBloodUnit = () => {
    setBloodUnitForm({
      component: "",
      bloodType: donation.bloodType || "",
      volumeMl: "",
      // Không cần trường location trong form, luôn lấy từ donation
      status: "Available",
    });
    setShowBloodUnit(true);
  };
  const closeBloodUnit = () => setShowBloodUnit(false);
  const handleBloodUnitChange = (field, value) => {
    setBloodUnitForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmitBloodUnit = async (e) => {
    e.preventDefault();
    try {
      const volume = Number(bloodUnitForm.volumeMl);
      // Tạo blood unit đúng chuẩn backend
      await api.post("/blood-unit", {
        donation: { donationId: donation.donationId },
        component: { componentId: bloodUnitForm.component },
        bloodType: bloodUnitForm.bloodType,
        volumeMl: volume,
        location: { locationId: donation.location?.locationId },
        status: bloodUnitForm.status || "Available",
      });
      alert("Tạo blood unit thành công!");
      closeBloodUnit();
      fetchDetail();
      // Fetch lại blood unit vừa tạo để lấy đúng locationId, componentId, bloodType
      const res = await api.get(
        `/blood-unit?donationId=${donation.donationId}`
      );
      let createdUnit = null;
      if (Array.isArray(res.data) && res.data.length > 0) {
        createdUnit = res.data[res.data.length - 1];
      }
      if (!createdUnit) {
        alert("Không tìm thấy blood unit vừa tạo để cập nhật inventory!");
        return;
      }
      // Cập nhật blood inventory dựa trên blood unit thực tế
      const locationId = createdUnit.location?.locationId;
      const componentId = createdUnit.component?.componentId;
      const bloodType = createdUnit.bloodType;
      // Kiểm tra inventory đã tồn tại chưa
      const invRes = await api.get(
        `/blood-inventory?locationId=${locationId}&componentId=${componentId}&bloodType=${bloodType}`
      );
      if (Array.isArray(invRes.data) && invRes.data.length > 0) {
        // Đã có inventory đúng tổ hợp, dùng PUT để update
        const inventory = invRes.data.find(
          (inv) =>
            inv.location?.locationId === locationId &&
            inv.component?.componentId === componentId &&
            inv.bloodType === bloodType
        );
        if (inventory) {
          await api.put(`/blood-inventory/${inventory.inventoryId}`, {
            location: { locationId },
            bloodType,
            component: { componentId },
            unitCount: (inventory.unitCount || 0) + (createdUnit.volumeMl || 0),
            lastUpdated: new Date().toISOString(),
          });
        } else {
          // Không tìm thấy inventory đúng tổ hợp, tạo mới
          await api.post("/blood-inventory", {
            location: { locationId },
            bloodType,
            component: { componentId },
            unitCount: createdUnit.volumeMl || 0,
            lastUpdated: new Date().toISOString(),
          });
        }
      } else {
        // Chưa có inventory nào cho tổ hợp này, tạo mới
        await api.post("/blood-inventory", {
          location: { locationId },
          bloodType,
          component: { componentId },
          unitCount: createdUnit.volumeMl || 0,
          lastUpdated: new Date().toISOString(),
        });
      }
      fetchBloodUnit();
      // Sau khi hoàn thành, chuyển sang kho máu và truyền state để lọc đúng
      navigate("/staff/blood-inventory", {
        state: {
          hospital: donation.location?.name || donation.location?.locationName,
          bloodType: bloodUnitForm.bloodType,
          componentId: bloodUnitForm.component,
        },
      });
    } catch (err) {
      alert(
        "Có lỗi khi tạo blood unit hoặc cập nhật inventory!\n" +
          (err?.response?.data?.message ||
            JSON.stringify(err?.response?.data) ||
            err.message)
      );
    }
  };

  if (loading)
    return (
      <SidebarLayout isStaff>
        <div style={{ padding: 32 }}>Đang tải...</div>
      </SidebarLayout>
    );
  if (error)
    return (
      <SidebarLayout isStaff>
        <div style={{ padding: 32, color: "red" }}>{error}</div>
      </SidebarLayout>
    );

  return (
    <SidebarLayout
      isStaff
      title={`Chi tiết đơn hiến máu #${donation.donationId}`}
    >
      <div
        style={{
          display: "flex",
          gap: 32,
          alignItems: "flex-start",
          padding: 32,
          maxWidth: 900,
          margin: "auto",
        }}
      >
        {/* Bên trái: Thông tin đơn */}
        <div
          style={{
            flex: 1,
            minWidth: 320,
            background: "#f8f9fa",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 8px rgba(23,76,143,0.08)",
          }}
        >
          <h2 style={{ color: "#174c8f", marginBottom: 16 }}>
            Thông tin đơn hiến máu
          </h2>
          <table style={{ width: "100%", marginBottom: 8 }}>
            <tbody>
              <tr>
                <td>
                  <b>ID:</b>
                </td>
                <td>{donation.donationId}</td>
              </tr>
              <tr>
                <td>
                  <b>Thành viên:</b>
                </td>
                <td>
                  {donation.member?.fullName || donation.member?.memberId}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Bệnh viện:</b>
                </td>
                <td>
                  {donation.location?.name || donation.location?.locationId}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Ngày hiến:</b>
                </td>
                <td>{donation.date}</td>
              </tr>
              <tr>
                <td>
                  <b>Nhóm máu:</b>
                </td>
                <td>{donation.bloodType}</td>
              </tr>
              <tr>
                <td>
                  <b>Ghi chú:</b>
                </td>
                <td>{donation.notes}</td>
              </tr>
              <tr>
                <td>
                  <b>Trạng thái:</b>
                </td>
                <td>{donation.status}</td>
              </tr>
            </tbody>
          </table>
          {(donation.status === "Pending" ||
            donation.status === "Chờ duyệt" ||
            donation.status === "Processing" ||
            donation.status === "Đang xử lý") && (
            <div style={{ marginTop: 16 }}>
              <button
                onClick={handleApprove}
                disabled={updating}
                style={{
                  background: "#388e3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 18px",
                  marginRight: 8,
                  cursor: updating ? "not-allowed" : "pointer",
                }}
              >
                {updating ? "Đang xử lý..." : "Chuyển sang Approved"}
              </button>
              <button
                onClick={handleReject}
                disabled={updating}
                style={{
                  background: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 18px",
                  cursor: updating ? "not-allowed" : "pointer",
                }}
              >
                {updating ? "Đang hủy..." : "Hủy đơn"}
              </button>
            </div>
          )}
        </div>
        {/* Bên phải: Nút tạo blood unit và form nhập */}
        <div
          style={{
            flex: 1,
            minWidth: 320,
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 8px rgba(23,76,143,0.08)",
          }}
        >
          <h2 style={{ color: "#1976d2", marginBottom: 16 }}>Blood Unit</h2>
          <button
            onClick={openBloodUnit}
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 22px",
              fontWeight: 600,
              marginBottom: 20,
              cursor: "pointer",
            }}
          >
            Tạo blood unit
          </button>
          {showBloodUnit && (
            <div style={{ marginTop: 8 }}>
              <form onSubmit={handleSubmitBloodUnit}>
                <div style={{ marginBottom: 12 }}>
                  <label>Donation ID:</label>
                  <input
                    type="text"
                    value={donation.donationId}
                    readOnly
                    disabled
                    style={{
                      width: "100%",
                      padding: 8,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      background: "#f3f4f6",
                    }}
                  />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label>Location ID:</label>
                  <input
                    type="text"
                    value={donation.location?.locationId || ""}
                    readOnly
                    disabled
                    style={{
                      width: "100%",
                      padding: 8,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      background: "#f3f4f6",
                    }}
                  />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label>Component:</label>
                  <select
                    value={bloodUnitForm.component}
                    onChange={(e) =>
                      handleBloodUnitChange("component", e.target.value)
                    }
                    required
                    style={{
                      width: "100%",
                      padding: 8,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">-- Chọn thành phần máu --</option>
                    {components.map((c) => (
                      <option key={c.componentId} value={c.componentId}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label>Blood Type:</label>
                  <select
                    value={bloodUnitForm.bloodType}
                    onChange={(e) =>
                      handleBloodUnitChange("bloodType", e.target.value)
                    }
                    required
                    style={{
                      width: "100%",
                      padding: 8,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">-- Chọn nhóm máu --</option>
                    {bloodTypes.map((bt) => (
                      <option key={bt} value={bt}>
                        {bt}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label>Volume (ml):</label>
                  <input
                    type="number"
                    value={bloodUnitForm.volumeMl}
                    onChange={(e) =>
                      handleBloodUnitChange("volumeMl", e.target.value)
                    }
                    required
                    style={{
                      width: "100%",
                      padding: 8,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label>Status:</label>
                  <select
                    value={bloodUnitForm.status}
                    onChange={(e) =>
                      handleBloodUnitChange("status", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: 8,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="Available">Available</option>
                    <option value="Used">Used</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 8,
                  }}
                >
                  <button
                    type="button"
                    onClick={closeBloodUnit}
                    style={{
                      background: "#f3f4f6",
                      color: "#666",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 18px",
                    }}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: "#388e3c",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 18px",
                    }}
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          )}
          {/* BỎ hoàn toàn block hiển thị blood unit đã tạo */}
          {/* Nếu muốn chú thích khi chưa có blood unit: */}
          {!bloodUnit && !showBloodUnit && (
            <div style={{ color: "#888", marginTop: 8 }}>
              Chưa có blood unit nào.
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}

export default StaffDonationDetail;
