import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../../state/AuthContext.jsx";

export default function JobDetail() {
  const { id } = useParams();
  const { user, getJob } = useAuth(); // use getJob from AuthContext
  const nav = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch job details on mount
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const data = await getJob(id); // fetch job using backend
        setJob(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load job");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, getJob]);

  if (loading) return <div className="p-5 text-center text-muted">Loading job...</div>;
  if (error) return <div className="alert alert-warning">{error}</div>;
  if (!job) return <div className="alert alert-warning">Job not found.</div>;

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="job-header border">
          <div
            className="cover"
            style={{
              backgroundImage: `url(${
                job.coverUrl ||
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
              })`,
            }}
          ></div>
          <div className="overlay"></div>
          <div className="info d-flex align-items-center gap-3">
            <div className="company-logo" style={{ width: 60, height: 60 }}>
              {job.logoUrl ? (
                <img src={job.logoUrl} alt={job.company} />
              ) : (
                <span className="text-muted">{job.company?.[0] || "?"}</span>
              )}
            </div>
            <div>
              <h3 className="mb-0">{job.title}</h3>
              <div className="text-white-50">
                {job.company} • {job.location}
              </div>
            </div>
            <span className="badge text-bg-light ms-auto">{job.type}</span>
          </div>
        </div>
      </div>

      <div className="col-lg-8">
        <div className="card">
          <div className="card-body">
            <p className="mt-1">{job.description}</p>
            <div className="mb-3 d-flex flex-wrap gap-2">
              {(job.tags || []).map((t) => (
                <span key={t} className="badge rounded-pill text-bg-secondary">
                  {t}
                </span>
              ))}
            </div>
            <strong className="d-block mb-3">{job.salary}</strong>
            {user?.role === "seeker" ? (
              <button
                className="btn btn-primary"
                onClick={() => nav(`/apply/${job._id}`)}
              >
                Apply
              </button>
            ) : (
              <Link to="/register" className="btn btn-outline-primary">
                Create seeker account to apply
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="card">
          <div className="card-body">
            <h5>About the company</h5>
            <p className="text-muted small">
              Our organization is committed to quality, innovation, and customer success. We believe
              great results come from diverse teams, clear ownership, and continuous learning. Join
              us to do your best work and make a real difference.
            </p>
            <div className="d-flex align-items-center gap-2">
              <div className="small">
                <div>
                  <strong>{job.company}</strong>
                </div>
                <div className="text-muted">{job.location}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
