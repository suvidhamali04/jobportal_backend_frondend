import React, { useEffect, useState } from "react";
import JobCard from "../../components/JobCard.jsx";
import { useAuth } from "../../state/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function JobsList() {
  const { user, getJobs } = useAuth(); // ✅ use getJobs from AuthContext
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  // useEffect(() => {
  //   if (!user) navigate("/");
  // }, [user, navigate]);

  // Fetch jobs list using getJobs()
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs({ q, location, type });
      setJobs(data.jobs || []);
    } catch (err) {
      console.error(err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Refetch whenever filters change
  useEffect(() => {
    fetchJobs();
  }, [q, location, type]);

  return (
    <div className="row g-4">
      {/* Filters */}
      <div className="col-lg-3">
        <div className="card">
          <div className="card-body">
            <h5>Filters</h5>
            <div className="mb-3">
              <label className="form-label">Search</label>
              <input
                className="form-control"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="title, company, tag"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Pune, Remote"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job Type</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Any</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>Onsite</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="col-lg-9">
        {loading ? (
          <div className="p-5 text-center text-muted">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="p-5 text-center text-muted">No jobs found.</div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {jobs.map((j) => (
              <div className="col" key={j._id}>
                <JobCard job={j} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
