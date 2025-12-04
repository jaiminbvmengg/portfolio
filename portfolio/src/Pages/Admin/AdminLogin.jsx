import React, { useState } from "react";

const AdminLogin = ({ onLogin }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Frontend validation
    if (!user.trim() || !pass.trim()) {
      setError("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://portfolio-f8i9.onrender.com/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      });

      if (!res.ok) {
        throw new Error("Server not responding");
      }

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("admin_auth", "yes");
        onLogin();
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setError("Server error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <h2>Admin Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
