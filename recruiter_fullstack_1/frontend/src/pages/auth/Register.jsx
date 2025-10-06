import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../state/AuthContext.jsx";

export default function Register() {
  // include logout just in case your register() auto-logs in
  const { register, logout } = useAuth();
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker", // ✅ default value
    phone: "",
  });

  const [err, setErr] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    document.body.classList.add("auth-page");
    return () => document.body.classList.remove("auth-page");
  }, []);

  const onChange = (e) =>
    setPayload((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const { email, phone } = payload;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return setErr("Please enter a valid email.");

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone))
      return setErr("Phone number must be exactly 10 digits.");

    try {
      await register(payload);

      // 🔑 ensure redirect to login page only
      if (typeof logout === "function") logout(); // no-op if not needed
      navigate("/login", { replace: true });
    } catch (ex) {
      setErr(ex.message || "Registration failed.");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-7 col-lg-6">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h3 className="mb-4">Create your account</h3>

            {err && <div className="alert alert-danger">{err}</div>}

            <form onSubmit={onSubmit} className="row g-3">
              {/* Full Name */}
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={payload.name}
                  onChange={onChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={payload.email}
                  onChange={onChange}
                  required
                />
              </div>

              {/* Password with Eye Toggle */}
              <div className="col-md-6 position-relative">
                <label className="form-label">Password</label>
                <input
                  className="form-control pe-5"
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={payload.password}
                  onChange={onChange}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    // Eye Slash (Visible)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10 10 0 0 1 12 19c-7 0-10-7-10-7a17.41 17.41 0 0 1 3.06-4.94" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                      <path d="M10.12 10.12a3 3 0 0 0 4.24 4.24" />
                    </svg>
                  ) : (
                    // Eye (Hidden)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s3-7 11-7 11 7 11 7-3 7-11 7-11-7-11-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </span>
              </div>

              {/* Phone Number */}
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input
                  className="form-control"
                  type="tel"
                  name="phone"
                  value={payload.phone}
                  onChange={onChange}
                  maxLength="10"
                  pattern="[0-9]{10}"   // ✅ fixed HTML regex
                  title="Phone number must be exactly 10 digits"
                  required
                />
              </div>

              {/* Role Selection */}
              <div className="col-md-6">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  name="role"
                  value={payload.role}
                  onChange={onChange}
                  required
                >
                  <option value="seeker">Job Seeker</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="col-12">
                <button className="btn btn-primary w-100" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
