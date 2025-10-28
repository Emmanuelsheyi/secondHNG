import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../services/auth";
import { useToast } from "./ToastProvider";

export default function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { showToast } = useToast();

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await authLogin({ email, password });
      showToast({
        type: "success",
        message: "Logged in",
        className: "auth-success",
      });
      navigate("/dashboard");
    } catch (err) {
      const msg = err.message || "Login failed";
      setError(msg);
      showToast({ type: "error", message: msg });
    }
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="form">
        <div className="field">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>
        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <a style={{ alignSelf: "center" }} href="/auth/signup">
            Create account
          </a>
        </div>
      </form>
    </div>
  );
}
