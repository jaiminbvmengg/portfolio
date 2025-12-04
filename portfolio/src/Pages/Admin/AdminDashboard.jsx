// src/Pages/Admin/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const PAGE_SIZE = 10;

// 🔥 Set your backend URL here (Render backend)
const API_BASE = "https://portfolio-f8i9.onrender.com/api/resumes";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  // Fetch all enquiries
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      const json = await res.json();

      if (json && json.success) {
        setData(json.data || []);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Failed to load enquiries:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Delete entry
  const deleteEntry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      loadData(); // refresh list
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/admin");
  };

  // Search + Sort + Filter
  const filtered = useMemo(() => {
    if (!data.length) return [];

    const q = search.trim().toLowerCase();

    let list = data.filter((it) => {
      if (!q) return true;
      return (
        String(it.name).toLowerCase().includes(q) ||
        String(it.email).toLowerCase().includes(q) ||
        String(it.phone).toLowerCase().includes(q) ||
        String(it.message).toLowerCase().includes(q)
      );
    });

    switch (sortBy) {
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "oldest":
        list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "newest":
      default:
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return list;
  }, [data, search, sortBy]);

  // Pagination
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [pageCount]);

  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">ADMIN</h2>
        <ul className="sidebar-menu">
          <li className="active">Dashboard</li>
          <li onClick={() => navigate("/charts")} style={{ cursor: "pointer" }}>
            Charts
          </li>
        </ul>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="admin-content">
        <div className="admin-topbar">
          <h1>Enquiries</h1>
          <div className="top-actions">
            <div className="sort-controls">
              <label>Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name-asc">Name A → Z</option>
                <option value="name-desc">Name Z → A</option>
              </select>
            </div>
          </div>
        </div>

        <div className="search-container" style={{ marginTop: 12 }}>
          <input
            type="text"
            placeholder="Search by name, email, phone or message..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Table */}
        <div className="table-container" style={{ marginTop: 18 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Date</th>
                <th style={{ width: "80px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              ) : pageData.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                pageData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone || "—"}</td>
                    <td>{item.message || "—"}</td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteEntry(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-footer">
          <button
            className="page-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>

          <span style={{ padding: "0 10px" }}>
            Page {page} of {pageCount}
          </span>

          <button
            className="page-btn"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
