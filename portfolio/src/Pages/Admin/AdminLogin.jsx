try {
  const res = await fetch("https://portfolio-f8i9.onrender.com/api/admin-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, pass }),
  });

  const text = await res.text(); // read raw
  let data;
  try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }

  if (!res.ok) {
    setError(`Server returned ${res.status}: ${data.message || data.raw || res.statusText}`);
    return;
  }

  if (data.success) {
    localStorage.setItem("admin_auth", "yes");
    onLogin();
  } else {
    setError(data.message || "Invalid username or password");
  }
} catch (err) {
  setError(`Network/error: ${err.message}`);
}
