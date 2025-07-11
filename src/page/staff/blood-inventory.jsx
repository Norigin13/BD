import React, { useEffect, useState } from "react";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";

function StaffBloodInventory() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState({ location: "", component: "", bloodType: "" });
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  // State tạm thời cho dropdown
  const [pendingSearch, setPendingSearch] = useState({ location: '', component: '', bloodType: '' });

  const fetchInventory = async () => {
    try {
      const res = await api.get("/blood-inventory");
      setInventory(res.data);
    } catch {
      alert("Không thể tải dữ liệu kho máu.");
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Lấy unique object cho dropdown (không trùng, không thiếu, label đúng)
  const uniqueLocations = Array.from(
    new Map(
      inventory
        .filter(i => i.location && (i.location.locationName || i.location.name) && i.location.locationId)
        .map(i => [i.location.locationId, i.location])
    ).values()
  );

  const uniqueComponents = Array.from(
    new Map(
      inventory
        .filter(i => i.component && (i.component.componentName || i.component.name) && i.component.componentId)
        .map(i => [i.component.componentId, i.component])
    ).values()
  );
  const uniqueBloodTypes = Array.from(new Set(inventory.map(i => i.bloodType))).filter(Boolean);

  // Lọc inventory theo ID (dùng state search, không dùng pendingSearch)
  const filtered = inventory.filter(i => {
    return (
      (!search.location || String(i.location?.locationId) === String(search.location)) &&
      (!search.component || String(i.component?.componentId) === String(search.component)) &&
      (!search.bloodType || i.bloodType === search.bloodType)
    );
  });

  const handleEdit = (id, value) => {
    setEditId(id);
    setEditValue(value);
  };

  const handleSave = async (row) => {
    setSaving(true);
    try {
      await api.put(`/blood-inventory/${row.inventoryId}`, {
        ...row,
        unitCount: Number(editValue),
      });
      await fetchInventory();
      setEditId(null);
      setEditValue("");
    } catch {
      alert("Cập nhật thất bại!");
    }
    setSaving(false);
  };

  // Hàm lấy tên ngắn gọn từ componentName
  function shortComponentName(name) {
    if (!name) return '';
    const commaIdx = name.indexOf(',');
    if (commaIdx > 0) return name.slice(0, commaIdx);
    return name.split(' ').slice(0, 3).join(' ');
  }

  return (
    <SidebarLayout title="Quản lý kho máu" isStaff>
      <div style={{ padding: 32 }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}>Danh sách kho máu</h2>
        {/* Thanh search/filter */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 18, alignItems: 'center' }}>
          <select
            value={pendingSearch.location}
            onChange={e => setPendingSearch({ ...pendingSearch, location: e.target.value })}
            style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc', minWidth: 150, fontSize: 15, maxHeight: 220, overflowY: 'auto' }}
          >
            <option value="">Tất cả bệnh viện</option>
            {uniqueLocations.map(loc => (
              <option key={loc.locationId} value={loc.locationId}>{loc.locationName || loc.name}</option>
            ))}
          </select>
          <select
            value={pendingSearch.component}
            onChange={e => setPendingSearch({ ...pendingSearch, component: e.target.value })}
            style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc', minWidth: 150, fontSize: 15, maxHeight: 220, overflowY: 'auto' }}
          >
            <option value="">Tất cả thành phần máu</option>
            {uniqueComponents.map(comp => (
              <option key={comp.componentId} value={comp.componentId}>{shortComponentName(comp.componentName || comp.name)}</option>
            ))}
          </select>
          <select
            value={pendingSearch.bloodType}
            onChange={e => setPendingSearch({ ...pendingSearch, bloodType: e.target.value })}
            style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc', minWidth: 100, fontSize: 15 }}
          >
            <option value="">Tất cả nhóm máu</option>
            {uniqueBloodTypes.map(blood => (
              <option key={blood} value={blood}>{blood}</option>
            ))}
          </select>
          <button
            style={{ marginLeft: 12, padding: '7px 18px', borderRadius: 5, background: '#2563eb', color: '#fff', fontWeight: 600, border: 'none', fontSize: 15, cursor: 'pointer' }}
            onClick={() => setSearch({ ...pendingSearch })}
          >
            Search
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 10, fontSize: 15, minWidth: 700 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={{ padding: '8px 6px', fontWeight: 600 }}>ID</th>
                <th style={{ padding: '8px 6px', fontWeight: 600 }}>Bệnh viện</th>
                <th style={{ padding: '8px 6px', fontWeight: 600 }}>Nhóm máu</th>
                <th style={{ padding: '8px 6px', fontWeight: 600 }}>Thành phần máu</th>
                <th style={{ padding: '8px 6px', fontWeight: 600 }}>Số lượng</th>
                <th style={{ padding: '8px 6px', fontWeight: 600 }}>Cập nhật</th>
                <th style={{ padding: '8px 6px', fontWeight: 600 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(i => (
                <tr key={i.inventoryId} style={{ background: '#f9fafb' }}>
                  <td style={{ padding: '8px 6px', textAlign: 'center' }}>{i.inventoryId}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', maxWidth: 140, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{i.location?.locationName || i.location?.name || ''}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center' }}>{i.bloodType}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', maxWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{i.component?.componentName || i.component?.name || ''}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                    {editId === i.inventoryId ? (
                      <input
                        type="number"
                        value={editValue}
                        min={0}
                        onChange={e => setEditValue(e.target.value)}
                        style={{ width: 60, padding: 4, borderRadius: 4 }}
                      />
                    ) : (
                      i.unitCount
                    )}
                  </td>
                  <td style={{ padding: '8px 6px', textAlign: 'center' }}>{i.lastUpdated}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                    {editId === i.inventoryId ? (
                      <>
                        <button onClick={() => handleSave(i)} disabled={saving} style={{ marginRight: 6, padding: '4px 10px', fontSize: 14 }}>Lưu</button>
                        <button onClick={() => setEditId(null)} disabled={saving} style={{ padding: '4px 10px', fontSize: 14 }}>Huỷ</button>
                      </>
                    ) : (
                      <button onClick={() => handleEdit(i.inventoryId, i.unitCount)} style={{ padding: '4px 10px', fontSize: 14 }}>Chỉnh sửa</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SidebarLayout>
  );
}

export default StaffBloodInventory; 