import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";
import "../styles.css";

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

function storageKeyFor(user) {
  const id = user?.email || user?.id || "anonymous";
  return `profile_overrides:${id}`;
}

export default function Profile() {
  const { user, updateUser } = useAuth();
  const baseUser = user || {};
  const skey = storageKeyFor(baseUser);

  const stored = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(skey) || "{}"); }
    catch { return {}; }
  }, [skey]);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(stored.name ?? baseUser.name ?? "Your Name");
  const [headline, setHeadline] = useState(stored.headline ?? baseUser.headline ?? "Actively seeking opportunities");
  const [location, setLocation] = useState(stored.location ?? baseUser.location ?? "Remote / Open to relocate");
  const [phone, setPhone] = useState(stored.phone ?? baseUser.phone ?? "");
  const [website, setWebsite] = useState(stored.website ?? baseUser.website ?? "https://your-portfolio.example.com");
  const [skills, setSkills] = useState(stored.skills ?? baseUser.skills ?? ["React","Node.js"]);
  const [newSkill, setNewSkill] = useState("");
  const [resumeDataUrl, setResumeDataUrl] = useState(stored.resumeDataUrl ?? baseUser.resumeDataUrl ?? "");
  const [resumeName, setResumeName] = useState(stored.resumeName ?? baseUser.resumeName ?? "");
  const role = baseUser.role ?? "seeker";

  useEffect(() => {
    const s = stored;
    setName(s.name ?? baseUser.name ?? "Your Name");
    setHeadline(s.headline ?? baseUser.headline ?? "Actively seeking opportunities");
    setLocation(s.location ?? baseUser.location ?? "Remote / Open to relocate");
    setPhone(s.phone ?? baseUser.phone ?? "");
    setWebsite(s.website ?? baseUser.website ?? "https://your-portfolio.example.com");
    setSkills(s.skills ?? baseUser.skills ?? ["React","Node.js"]);
    setResumeDataUrl(s.resumeDataUrl ?? baseUser.resumeDataUrl ?? "");
    setResumeName(s.resumeName ?? baseUser.resumeName ?? "");
    setEditing(false);
  }, [skey]);

  const persist = () => {
    const next = { name, headline, location, phone, website, skills, resumeDataUrl, resumeName };
    localStorage.setItem(skey, JSON.stringify(next));
    if (typeof updateUser === "function") updateUser({ ...baseUser, ...next });
  };

  const onAddSkill = () => {
    const s = newSkill.trim();
    if (!s || skills.includes(s)) return setNewSkill("");
    setSkills([...skills, s]);
    setNewSkill("");
  };
  const onRemoveSkill = skill => setSkills(skills.filter(s => s !== skill));

  const onUploadResume = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5*1024*1024) { alert("File ≤ 5MB"); return; }
    if (file.type !== "application/pdf") { alert("PDF only"); return; }
    const dataUrl = await fileToDataURL(file);
    setResumeDataUrl(dataUrl);
    setResumeName(file.name);
  };
  const onViewResume = () => {
    if (!resumeDataUrl) return;
    const win = window.open();
    win?.document.write(`<iframe src="${resumeDataUrl}" style="width:100%;height:100%"></iframe>`);
  };

  const onSave = () => { persist(); setEditing(false); };
  const onCancel = () => { setEditing(false); };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-10">
        {/* Profile header */}
        <div className="profile-card">
          <div className="profile-banner color" />
          <div className="profile-body p-4 p-md-5">
            <div className="d-flex align-items-end gap-3">
              <div className="profile-avatar-lg">
                {baseUser.avatar ? <img src={baseUser.avatar} alt={name}/> : <div className="profile-avatar-fallback">{name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}</div>}
              </div>
              <div className="flex-grow-1">
                {editing ? <input className="form-control form-control-lg fw-bold" value={name} onChange={e=>setName(e.target.value)} /> : <h2 className="mb-1">{name}</h2>}
                <div className="text-muted d-flex flex-wrap gap-2">
                  <span className="badge bg-white text-primary text-capitalize fw-semibold">{role}</span>
                  <span className="text-white-50">•</span>
                  {editing ? <input className="form-control form-control-sm w-auto" value={location} onChange={e=>setLocation(e.target.value)} /> : <span className="text-white-75">{location}</span>}
                </div>
              </div>
              <div className="ms-auto d-none d-md-flex gap-2">
                {!editing ? <button className="btn btn-light" onClick={()=>setEditing(true)}>Edit Profile</button> : <>
                  <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                  <button className="btn btn-primary" onClick={onSave}>Save</button>
                </>}
              </div>
            </div>
            <div className="mt-3">
              {editing ? <input className="form-control" value={headline} onChange={e=>setHeadline(e.target.value)} /> : <p className="lead mb-0 text-white-90">{headline}</p>}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="row g-4 mt-1">
          <div className="col-md-7">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="section-title">Profile</h5>
                <dl className="row mb-0">
                  <dt className="col-sm-4">Email</dt><dd className="col-sm-8">{baseUser.email}</dd>
                  <dt className="col-sm-4">Website</dt>
                  <dd className="col-sm-8">
                    {editing ? <input className="form-control form-control-sm" value={website} onChange={e=>setWebsite(e.target.value)} /> : <a href={website} target="_blank" rel="noreferrer">{website.replace(/^https?:\/\//,"")}</a>}
                  </dd>
                  <dt className="col-sm-4">Phone</dt>
                  <dd className="col-sm-8">
                    {editing ? <input className="form-control form-control-sm" value={phone} onChange={e=>setPhone(e.target.value)} /> : (phone ? <a href={`tel:${phone}`}>{phone}</a> : <span className="text-muted">—</span>)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Skills & Resume */}
          <div className="col-md-5">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="section-title">Skills & Resume</h5>

                {/* Skills */}
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {skills.map(s => <span key={s} className="skill-chip color">{s} {editing && <button type="button" className="remove-skill" onClick={()=>onRemoveSkill(s)}>×</button>}</span>)}
                </div>
                {editing && <div className="d-flex gap-2 mb-3">
                  <input className="form-control" placeholder="Add a skill" value={newSkill} onChange={e=>setNewSkill(e.target.value)} onKeyDown={e=>e.key==="Enter" && (e.preventDefault(), onAddSkill())} />
                  <button className="btn btn-outline-primary" onClick={onAddSkill}>Add</button>
                </div>}

                {/* Resume */}
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className=" fa fa-file-pdf-o resume-ico">📄</span>
                    <div>
                      <div className="fw-semibold">{resumeName || "No resume uploaded"}</div>
                      <small className="text-muted">{resumeName ? "PDF • Saved locally" : "Upload a PDF (≤ 5 MB)"}</small>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    {resumeDataUrl && <button className="btn btn-sm btn-outline-secondary view-resume-btn" onClick={onViewResume}>View</button>}
                    {editing && <label className="btn btn-sm btn-primary mb-0">Upload
                      <input hidden type="file" accept="application/pdf" onChange={onUploadResume} />
                    </label>}
                  </div>
                </div>

                {/* Save / Cancel for mobile */}
                {editing && <div className="text-end mt-3">
                  <button className="btn btn-secondary me-2" onClick={onCancel}>Cancel</button>
                  <button className="btn btn-primary" onClick={onSave}>Save</button>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
