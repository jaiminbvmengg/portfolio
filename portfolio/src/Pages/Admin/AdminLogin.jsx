import React, { useState } from "react";
import "./Admin.css";

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // simple static password (you can improve later)
    if (password === "admin123") {
      localStorage.setItem("admin_auth", "true");
      onLogin(true);
    } else {
      alert("Incorrect Password");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
