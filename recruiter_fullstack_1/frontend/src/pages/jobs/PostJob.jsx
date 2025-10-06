import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/AuthContext.jsx';

export default function PostJob() {
  const { user, createJob } = useAuth(); // ✅ use backend-connected API
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    tags: '',
    description: '',
  });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(',')
          .map((x) => x.trim())
          .filter(Boolean),
      };
      await createJob(payload); // ✅ call backend API
      nav('/dashboard/recruiter');
    } catch (err) {
      alert(err.message || 'Failed to post job');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card">
          <div className="card-body">
            <h3 className="mb-3">Post a Job</h3>
            <form className="row g-3" onSubmit={onSubmit}>
              <div className="col-md-6">
                <label className="form-label">Job Title</label>
                <input
                  className="form-control"
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Company</label>
                <input
                  className="form-control"
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Location</label>
                <input
                  className="form-control"
                  name="location"
                  value={form.location}
                  onChange={onChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  name="type"
                  value={form.type}
                  onChange={onChange}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>Onsite</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Salary</label>
                <input
                  className="form-control"
                  name="salary"
                  value={form.salary}
                  onChange={onChange}
                  placeholder="₹10–15 LPA"
                />
              </div>
              <div className="col-12">
                <label className="form-label">
                  Tags <span className="text-muted">(comma-separated)</span>
                </label>
                <input
                  className="form-control"
                  name="tags"
                  value={form.tags}
                  onChange={onChange}
                  placeholder="React, JavaScript, Bootstrap"
                />
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="5"
                  name="description"
                  value={form.description}
                  onChange={onChange}
                ></textarea>
              </div>
              <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-primary">Publish Job</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
