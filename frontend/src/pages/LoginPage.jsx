import { useState } from "react";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);

    /* Login: pms_admin
    Password: hotelpms2026
    */
    if (username === "pms_admin" && password === "hotelpms2026") {
      const userData = { username };
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(userData));
      onLogin(userData);
    } else {
      setError("Invalid username or password. Please try again.");
    }
    setBusy(false);
  }

  return (
    <main className="login-shell">
      <form className="login-card" onSubmit={submit}>
        <p className="eyebrow">Property Hotel Management System (PMS)</p>
        <h1>Account Login</h1>
        <p className="muted">Login as a user or administrator.</p>

        {error && <div className="alert error" style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="pms_admin"
            required
          />
        </label>

        <label>
          Password
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              required
              style={{ width: "100%", paddingRight: "3.5rem" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.8rem",
                color: "#666",
                fontWeight: "600"
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        <button
          className="primary-button full-width"
          type="submit"
          disabled={busy}
          style={{ marginTop: "1rem" }}
        >
          {busy ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}

export default LoginPage;