import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../state/AuthContext.jsx";

export default function ApplyJob() {
  const { id } = useParams();
  const { user, getJob, uploadResume, applyJob } = useAuth(); // ✅ AuthContext APIs
  const nav = useNavigate();

  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const data = await getJob(id);
        setJob(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch job");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, getJob]);

  if (loading)
    return <div className="p-5 text-center text-muted">Loading job...</div>;
  if (error) return <div className="alert alert-warning">{error}</div>;
  if (!job) return <div className="alert alert-warning">Job not found.</div>;

  // Handle file selection with validation
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Only PDF or DOC/DOCX allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Max 5MB allowed.");
      return;
    }

    setResumeFile(file);
    setResumeName(file.name);
  };

  // Submit application
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) return alert("Please select a resume file.");

    try {
      setSubmitting(true);
      setUploadProgress(0);

      // 1️⃣ Upload resume
      const { resumeUrl } = await uploadResume(resumeFile, (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        }
      });

      // 2️⃣ Apply for job
      await applyJob({
        jobId: id,
        coverLetter,
        resumeUrl,
      });

      nav("/dashboard/seeker");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card">
          <div className="card-body">
            <h3 className="mb-1">Apply: {job.title}</h3>
            <div className="text-muted mb-3">
              {job.company} • {job.location}
            </div>
            <form className="vstack gap-3" onSubmit={onSubmit}>
              <div>
                <label className="form-label">Cover Letter</label>
                <textarea
                  className="form-control"
                  rows="6"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Write a brief cover letter..."
                  required
                />
              </div>
              <div>
                <label className="form-label">Resume (PDF/DOCX)</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".pdf,.doc,.docx"
                  onChange={onFile}
                  required
                />
                {resumeName && <div className="form-text">Selected: {resumeName}</div>}
              </div>

              {uploadProgress > 0 && (
                <div className="progress mb-2">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${uploadProgress}%` }}
                    aria-valuenow={uploadProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {uploadProgress}%
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-end">
                <button className="btn btn-primary" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
