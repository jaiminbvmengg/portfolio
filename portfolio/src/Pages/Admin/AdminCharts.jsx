// src/Pages/Admin/AdminCharts.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

// Register Chart.js components
Chart.register(...registerables);

// Central API URL
const API_URL = "https://portfolio-f8i9.onrender.com/api/resumes";

const AdminCharts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const textColor = isDark ? "#ffffff" : "#111111";

  // ---------------------------
  // Fetch Data
  // ---------------------------
  const loadData = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();

      if (json.success) {
        setData(json.data || []);
      }
    } catch (err) {
      console.error("Failed to load chart data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ---------------------------
  // Memoized Analytics
  // ---------------------------
  const { perDayLabels, perDayValues, perMonthLabels, perMonthValues, pieData } =
    useMemo(() => {
      const dayCount = {};
      const monthCount = {};

      let short = 0,
        medium = 0,
        long = 0;

      data.forEach((d) => {
        const date = new Date(d.createdAt);

        // Per Day
        const day = date.toLocaleDateString();
        dayCount[day] = (dayCount[day] || 0) + 1;

        // Per Month
        const monthYear = date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        monthCount[monthYear] = (monthCount[monthYear] || 0) + 1;

        // Message Length
        const len = (d.message || "").length;
        if (len <= 20) short++;
        else if (len <= 60) medium++;
        else long++;
      });

      return {
        perDayLabels: Object.keys(dayCount),
        perDayValues: Object.values(dayCount),

        perMonthLabels: Object.keys(monthCount),
        perMonthValues: Object.values(monthCount),

        pieData: {
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
        },
      };
    }, [data]);

  // ---------------------------
  // Loading / Empty States
  // ---------------------------
  if (loading) {
    return (
      <div className="admin-content">
        <h1>Analytics Dashboard</h1>
        <p>Loading charts...</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="admin-content">
        <h1>Analytics Dashboard</h1>
        <p>No enquiry data available yet.</p>
      </div>
    );
  }

  // ---------------------------
  // Render Charts
  // ---------------------------
  return (
    <div className="admin-wrapper">
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

      <main className="admin-content">
        <h1>Analytics Dashboard</h1>

        {/* Bar Chart */}
        <div className="chart-box">
          <h2>Enquiries Per Day</h2>

          <Bar
            data={{
              labels: perDayLabels,
              datasets: [
                {
                  label: "Enquiries",
                  data: perDayValues,
                  backgroundColor: "rgba(99, 132, 255, 0.5)",
                },
              ],
            }}
            options={{
              plugins: { legend: { labels: { color: textColor } } },
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
              labels: perMonthLabels,
              datasets: [
                {
                  label: "Enquiries",
                  data: perMonthValues,
                  borderColor: "rgba(75,192,192,1)",
                  backgroundColor: "rgba(75,192,192,0.3)",
                },
              ],
            }}
            options={{
              plugins: { legend: { labels: { color: textColor } } },
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
              plugins: { legend: { labels: { color: textColor } } },
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default AdminCharts;
