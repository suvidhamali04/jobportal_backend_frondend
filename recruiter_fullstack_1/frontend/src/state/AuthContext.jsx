import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const API_URL = import.meta.env.VITE_BACKEND_URL || "https://jobportal-backend-eyim.onrender.com";

  // Axios instance
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  // Helper to include token in headers
  const authHeader = () =>
    user ? { Authorization: `Bearer ${user.token || user?.jwt || ""}` } : {};

  // 🔐 AUTH APIs
  const register = async (formData) => {
    try {
      const res = await api.post("/api/auth/register", formData);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  };

  const login = async (credentials) => {
    try {
      const res = await api.post("/api/auth/login", credentials);
      const data = res.data;

      setUser(data.user || data);
      localStorage.setItem("user", JSON.stringify(data.user || data));
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 💼 JOB APIs
  const getJobs = async (params = {}) => {
    try {
      const res = await api.get("/api/jobs", { params });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch jobs");
    }
  };

  const getJob = async (id) => {
    try {
      const res = await api.get(`/api/jobs/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch job");
    }
  };

  const createJob = async (jobData) => {
    try {
      const res = await api.post("/api/jobs", jobData, {
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to create job");
    }
  };

  const updateJob = async (id, jobData) => {
    try {
      const res = await api.put(`/api/jobs/${id}`, jobData, {
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to update job");
    }
  };

  const deleteJob = async (id) => {
    try {
      const res = await api.delete(`/api/jobs/${id}`, {
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to delete job");
    }
  };

  // 📄 APPLICATION APIs
  const applyJob = async ({ jobId, coverLetter, resumeUrl }) => {
    try {
      const res = await api.post(
        "/api/applications",
        { jobId, coverLetter, resumeUrl },
        { headers: authHeader() }
      );
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to apply for job");
    }
  };

  const getApplicationsForUser = async () => {
    try {
      const res = await api.get("/api/applications/me", {
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Failed to fetch your applications"
      );
    }
  };

  const getApplicationsForJob = async (jobId) => {
    try {
      const res = await api.get(`/api/applications/job/${jobId}`, {
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Failed to fetch applications for job"
      );
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const res = await api.put(
        `/api/applications/${id}/status`,
        { status },
        { headers: authHeader() }
      );
      return res.data;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Failed to update application status"
      );
    }
  };

const uploadResume = async (file, onUploadProgress) => {
  try {
    const formData = new FormData();
    formData.append('resume', file); // must match multer.single('resume')

    const res = await axios.post(
      `${API_URL}/api/applications/upload`,
      formData,
      {
        headers: {
          ...authHeader(), // include auth token
          // DO NOT set Content-Type here; let Axios set it automatically for FormData
        },
        onUploadProgress,
        withCredentials: true,
      }
    );

    return res.data; // { resumeUrl: ... }
  } catch (err) {
    console.error(err);
    throw new Error(err.response?.data?.message || "Failed to upload resume");
  }
};



  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        getJobs,
        getJob,
        createJob,
        updateJob,
        deleteJob,
        applyJob,
        getApplicationsForUser,
        getApplicationsForJob,
        updateApplicationStatus,
        uploadResume,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
