// import React, { useState } from 'react'
// import * as api from '../../utils/mockApi.js'
// import { useAuth } from '../../state/AuthContext.jsx'

// function ApplicantsModal({ job, onClose }){
//   const items = job ? api.applications.byJob(job.id) : []
//   const onUpdate = (id, status) => { api.applications.updateStatus(id, status); onClose() }
//   if(!job) return null
//   return (
//     <div className="modal d-block" tabIndex="-1" role="dialog">
//       <div className="modal-dialog modal-lg" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Applicants — {job.title}</h5>
//             <button className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             <div className="table-responsive">
//               <table className="table">
//                 <thead><tr><th>Name</th><th>Applied</th><th>Status</th><th>Actions</th></tr></thead>
//                 <tbody>
//                   {items.map(a => (
//                     <tr key={a.id}>
//                       <td>{a.seeker?.name || '—'}</td>
//                       <td>{new Date(a.appliedAt).toLocaleString()}</td>
//                       <td><span className="badge text-bg-secondary">{a.status}</span></td>
//                       <td className="d-flex gap-2">
//                         <button className="btn btn-sm btn-outline-success" onClick={()=>onUpdate(a.id,'Shortlisted')}>Shortlist</button>
//                         <button className="btn btn-sm btn-outline-danger" onClick={()=>onUpdate(a.id,'Rejected')}>Reject</button>
//                       </td>
//                     </tr>
//                   ))}
//                   {items.length===0 && <tr><td colSpan="4" className="text-center text-muted py-4">No applicants yet.</td></tr>}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="modal-footer">
//             <button className="btn btn-secondary" onClick={onClose}>Close</button>
//           </div>
//         </div>
//       </div>
//       <div className="modal-backdrop fade show" onClick={onClose}></div>
//     </div>
//   )
// }

// export default function RecruiterDashboard(){
//   const { user } = useAuth()
//   const [selected, setSelected] = useState(null)
//   const mine = api.jobs.mine(user.id)

//   return (
//     <div className="row g-4">
//       <div className="col-12 d-flex justify-content-between align-items-center">
//         <h3 className="mb-0">My Job Posts</h3>
//         <span className="badge text-bg-primary badge-role">Recruiter</span>
//       </div>
//       <div className="col-12">
//         <div className="card">
//           <div className="card-body">
//             <div className="table-responsive">
//               <table className="table align-middle">
//                 <thead><tr><th>Title</th><th>Company</th><th>Posted</th><th>Type</th><th>Applicants</th></tr></thead>
//                 <tbody>
//                   {mine.map(j => (
//                     <tr key={j.id}>
//                       <td>{j.title}</td>
//                       <td>{j.company}</td>
//                       <td>{new Date(j.postedAt).toLocaleDateString()}</td>
//                       <td>{j.type}</td>
//                       <td><button className="btn btn-sm btn-outline-secondary" onClick={()=>setSelected(j)}>View</button></td>
//                     </tr>
//                   ))}
//                   {mine.length===0 && <tr><td colSpan="5" className="text-center text-muted py-4">No job posts yet.</td></tr>}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//       {selected && <ApplicantsModal job={selected} onClose={()=>setSelected(null)}/>}
//     </div>
//   )
// }




// new

import React, { useEffect, useState } from 'react'
import * as api from '../../utils/mockApi.js'
import { useAuth } from '../../state/AuthContext.jsx'

/* ---------------------- Resume Viewer (child modal) ---------------------- */
function ResumeViewer({ open, name, url, onClose }){
  if(!open) return null
  const safeUrl = url || ''

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Resume — {name || 'Candidate'}</h5>
            <div className="d-flex align-items-center gap-2">
              {safeUrl && (
                <>
                  <a className="btn btn-sm btn-outline-primary" href={safeUrl} target="_blank" rel="noopener noreferrer">
                    Open in new tab
                  </a>
                  <a className="btn btn-sm btn-primary" href={safeUrl} target="_blank" rel="noopener noreferrer" download>
                    Download
                  </a>
                </>
              )}
              <button className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>
          </div>

          <div className="modal-body p-0">
            {!safeUrl ? (
              <div className="p-4 text-center text-muted">No resume uploaded by this applicant.</div>
            ) : (
              <iframe
                title="Resume preview"
                src={safeUrl}
                style={{ width: '100%', height: '80vh', border: 0 }}
              />
            )}
          </div>
        </div>
      </div>

      {/* light, click-to-close backdrop */}
      <div className="modal-backdrop fade show" onClick={onClose}></div>
    </div>
  )
}

/* --------------------------- Applicants (modal) -------------------------- */
function ApplicantsModal({ job, onClose }){
  const [rows, setRows] = useState(job ? api.applications.byJob(job.id) : [])
  const [resume, setResume] = useState({ open:false, url:'', name:'' })

  // refresh if modal switches to a different job
  useEffect(() => {
    setRows(job ? api.applications.byJob(job.id) : [])
  }, [job])

  const updateRow = (id, status) => {
    api.applications.updateStatus(id, status)
    setRows(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    // keep modal open so recruiter sees the status change
  }

  if(!job) return null

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Applicants — {job.title}</h5>
              <button className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Applied</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(a => {
                      const seeker = a.seeker || {}
                      // accept any of these fields for the resume URL
                      const resumeUrl =
                        a.resumeUrl || seeker.resumeUrl || seeker.resume || seeker.cvUrl || ''

                      return (
                        <tr key={a.id}>
                          <td className="fw-semibold">
                            {seeker.name || '—'}
                            {seeker.email && <div className="small text-muted">{seeker.email}</div>}
                          </td>
                          <td>{new Date(a.appliedAt).toLocaleString()}</td>
                          <td><span className="badge text-bg-secondary">{a.status}</span></td>
                          <td className="text-end">
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-primary"
                                disabled={!resumeUrl}
                                title={resumeUrl ? 'View resume' : 'No resume'}
                                onClick={() => setResume({ open:true, url:resumeUrl, name: seeker.name || 'Candidate' })}
                              >
                                View Resume
                              </button>
                              <button
                                className="btn btn-outline-success"
                                onClick={() => updateRow(a.id, 'Shortlisted')}
                              >
                                Shortlist
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => updateRow(a.id, 'Rejected')}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                    {rows.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-4">No applicants yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>

        {/* light, click-to-close backdrop */}
        <div className="modal-backdrop fade show" onClick={onClose}></div>
      </div>

      {/* nested resume viewer */}
      <ResumeViewer
        open={resume.open}
        name={resume.name}
        url={resume.url}
        onClose={() => setResume({ open:false, url:'', name:'' })}
      />
    </>
  )
}

/* ------------------------ Recruiter Dashboard page ----------------------- */
export default function RecruiterDashboard(){
  const { user } = useAuth()
  const [selected, setSelected] = useState(null)
  const mine = api.jobs.mine(user.id)

  return (
    <div className="row g-4">
      <div className="col-12 d-flex justify-content-between align-items-center">
        <h3 className="mb-0">My Job Posts</h3>
        <span className="badge text-bg-primary badge-role">Recruiter</span>
      </div>

      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Posted</th>
                    <th>Type</th>
                    <th className="text-end">Applicants</th>
                  </tr>
                </thead>
                <tbody>
                  {mine.map(j => (
                    <tr key={j.id}>
                      <td className="fw-semibold">{j.title}</td>
                      <td>{j.company}</td>
                      <td>{new Date(j.postedAt).toLocaleDateString()}</td>
                      <td>{j.type}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-secondary" onClick={()=>setSelected(j)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {mine.length===0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">No job posts yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Small-screen hint */}
            <div className="d-md-none small text-muted">
              Tip: swipe horizontally to see more columns.
            </div>
          </div>
        </div>
      </div>

      {selected && <ApplicantsModal job={selected} onClose={()=>setSelected(null)}/>}
    </div>
  )
}
