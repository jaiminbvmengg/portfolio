// src/Pages/Admin/AdminCharts.jsx
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

// Register all chart.js components
Chart.register(...registerables);

const AdminCharts = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Load data
  useEffect(() => {
    fetch("/api/resumes")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.data);
      });
  }, []);

  // Auto Theme Detection
  const isDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const textColor = isDark ? "#ffffff" : "#111111";

  // -------------------------------
  // 1. Bar Chart — Enquiries Per Day
  // -------------------------------
  const perDay = {};
  data.forEach((d) => {
    const day = new Date(d.createdAt).toLocaleDateString();
    perDay[day] = (perDay[day] || 0) + 1;
  });

  const dayLabels = Object.keys(perDay);
  const dayValues = Object.values(perDay);

  // -------------------------------
  // 2. Line Chart — Per Month
  // -------------------------------
  const perMonth = {};

  data.forEach((d) => {
    const dt = new Date(d.createdAt);
    const monthYear = dt.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    perMonth[monthYear] = (perMonth[monthYear] || 0) + 1;
  });

  const monthLabels = Object.keys(perMonth);
  const monthValues = Object.values(perMonth);

  // -------------------------------
  // 3. Pie Chart — Message Length
  // -------------------------------
  let short = 0,
    medium = 0,
    long = 0;

  data.forEach((d) => {
    const len = (d.message || "").length;
    if (len <= 20) short++;
    else if (len <= 60) medium++;
    else long++;
  });

  const pieData = {
    labels: ["Short (0–20 chars)", "Medium (21–60 chars)", "Long (60+ chars)"],
    datasets: [
      {
        data: [short, medium, long],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
      },
    ],
  };

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">ADMIN</h2>

        <ul className="sidebar-menu">
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li className="active">Charts</li>
        </ul>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("admin_auth");
            navigate("/admin");
          }}
        >
          Logout
        </button>
      </aside>

      {/* Charts Content */}
      <main className="admin-content">
        <h1>Analytics Dashboard</h1>

        {/* Bar Chart */}
        <div className="chart-box">
          <h2>Enquiries Per Day</h2>
          <Bar
            data={{
              labels: dayLabels,
              datasets: [
                {
                  label: "Enquiries",
                  data: dayValues,
                  backgroundColor: "rgba(99, 132, 255, 0.5)",
                },
              ],
            }}
            options={{
              plugins: {
                legend: { labels: { color: textColor } },
              },
              scales: {
                x: { ticks: { color: textColor } },
                y: { ticks: { color: textColor } },
              },
            }}
          />
        </div>

        {/* Line Chart */}
        <div className="chart-box">
          <h2>Enquiries Per Month</h2>
          <Line
            data={{
              labels: monthLabels,
              datasets: [
                {
                  label: "Enquiries",
                  data: monthValues,
                  borderColor: "rgba(75,192,192,1)",
                  backgroundColor: "rgba(75,192,192,0.3)",
                },
              ],
            }}
            options={{
              plugins: {
                legend: { labels: { color: textColor } },
              },
              scales: {
                x: { ticks: { color: textColor } },
                y: { ticks: { color: textColor } },
              },
            }}
          />
        </div>

        {/* Pie Chart */}
        <div className="chart-box">
          <h2>Message Length Distribution</h2>
          <Pie
            data={pieData}
            options={{
              plugins: {
                legend: { labels: { color: textColor } },
              },
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default AdminCharts;
