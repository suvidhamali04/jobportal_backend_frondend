import React from 'react'
import { Link } from 'react-router-dom'

export default function JobCard({ job }){
  return (
    <div className="card card-hover h-100">
      <div className="card-body">
        <div className="d-flex gap-3 align-items-start">
          <div className="company-logo">
            {job.logoUrl ? <img src={job.logoUrl} alt={job.company}/> : <span className="text-muted">{job.company?.[0] || '?'}</span>}
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="card-title mb-1">{job.title}</h5>
                <div className="text-muted">{job.company} • {job.location}</div>
              </div>
              <span className="badge text-bg-light">{job.type}</span>
            </div>
            <p className="mt-3 mb-2">{job.description}</p>
            <div className="mb-3 d-flex flex-wrap gap-2">
              {(job.tags||[]).map(t => <span key={t} className="badge rounded-pill text-bg-secondary">{t}</span>)}
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <strong>{job.salary}</strong>
              <Link className="btn btn-primary" to={`/jobs/${job._id}`}>View</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
