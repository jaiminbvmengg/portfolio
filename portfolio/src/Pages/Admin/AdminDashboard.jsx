// src/Pages/Admin/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

/**
 * Admin Dashboard
 * - Search
 * - Sorting (Name A→Z, Z→A, Newest, Oldest)
 * - Pagination (10 rows per page)
 * - Delete entry
 * - Navigation to Charts page and Logout
 *
 * Make sure your backend GET endpoint is: GET /api/resumes
 * and DELETE endpoint is: DELETE /api/resumes/:id
 */

const PAGE_SIZE = 10;

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI state
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest | name-asc | name-desc
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  // Fetch data from backend
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/resumes"); // assumes same origin or proxy set
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
      await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      // if success, reload
      loadData();
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Delete failed");
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/admin");
  };

  // Derived / filtered list
  const filtered = useMemo(() => {
    if (!data || data.length === 0) return [];
    const q = search.trim().toLowerCase();
    let list = data.filter((it) => {
      if (!q) return true;
      const name = String(it.name || "").toLowerCase();
      const email = String(it.email || "").toLowerCase();
      const phone = String(it.phone || "").toLowerCase();
      const msg = String(it.message || "").toLowerCase();
      return (
        name.includes(q) ||
        email.includes(q) ||
        phone.includes(q) ||
        msg.includes(q)
      );
    });

    // Sorting
    switch (sortBy) {
      case "name-asc":
        list.sort((a, b) => (String(a.name || "").localeCompare(b.name || "")));
        break;
      case "name-desc":
        list.sort((a, b) => (String(b.name || "").localeCompare(a.name || "")));
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
  }, [pageCount, page]);

  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
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

      {/* Main Content */}
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

        {/* Search */}
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
                <th style={{ width: "18%" }}>Name</th>
                <th style={{ width: "22%" }}>Email</th>
                <th style={{ width: "12%" }}>Phone</th>
                <th>Message</th>
                <th style={{ width: "14%" }}>Date</th>
                <th style={{ width: "8%" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: 24 }}>
                    Loading...
                  </td>
                </tr>
              ) : pageData.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: 24 }}>
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                pageData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone || "—"}</td>
                    <td style={{ maxWidth: 420, whiteSpace: "pre-wrap" }}>
                      {item.message || "—"}
                    </td>
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

        {/* Pagination controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <div>
            <button
              className="page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="page-btn"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
              style={{ marginLeft: 8 }}
            >
              Next
            </button>
          </div>

          <div style={{ color: "#555" }}>
            Page {page} of {pageCount} — {filtered.length} enquiries
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
