import React from 'react'
import * as api from '../../utils/mockApi.js'
import { useAuth } from '../../state/AuthContext.jsx'

export default function SeekerDashboard(){
  const { user } = useAuth()
  const apps = api.applications.bySeeker(user.id)

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0">My Applications</h3>
          <span className="badge text-bg-success badge-role">Job Seeker</span>
        </div>
      </div>
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Job</th><th>Company</th><th>Applied</th><th>Status</th><th>Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map(a => (
                    <tr key={a.id}>
                      <td>{a.job?.title || '—'}</td>
                      <td>{a.job?.company || '—'}</td>
                      <td>{new Date(a.appliedAt).toLocaleString()}</td>
                      <td><span className="badge text-bg-secondary">{a.status}</span></td>
                      <td>{a.resumeName || '—'}</td>
                    </tr>
                  ))}
                  {apps.length===0 && <tr><td colSpan="5" className="text-center text-muted py-4">No applications yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
