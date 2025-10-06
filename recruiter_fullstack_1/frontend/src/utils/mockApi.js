// Simple localStorage-backed mock API to let the UI function without a backend.

const LS = {
  users: 'recruitr_users',
  session: 'recruitr_session',
  jobs: 'recruitr_jobs',
  applications: 'recruitr_applications'
}

function id(){ return crypto.randomUUID() }

function read(key, fallback){
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback }
  catch { return fallback }
}
function write(key, value){ localStorage.setItem(key, JSON.stringify(value)) }

// Seed some demo data
(function seed(){
  if(!read(LS.jobs)) {
    const demo = [
      { id:id(), title:'Frontend Developer', company:'Acme Inc.', location:'Remote', type:'Full-time', salary:'₹8–12 LPA', tags:['React','JavaScript','Bootstrap'], postedAt:Date.now()-86400000*1, description:'Build UI with React, collaborate with designers.', recruiterId:'seed', logoUrl:'/src/assets/logos/acme.svg', coverUrl:'https://images.unsplash.com/photo-1547658719-99b74b9e9d43?q=80&w=1600&auto=format&fit=crop' },
      { id:id(), title:'Frontend Developer', company:'Acme Inc.', location:'Remote', type:'Full-time', salary:'₹8–12 LPA', tags:['React','JavaScript','Bootstrap'], postedAt:Date.now()-86400000*1, description:'Build UI with React, collaborate with designers.', recruiterId:'seed' },
      { id:id(), title:'Data Engineer', company:'Databurst', location:'Pune', type:'Hybrid', salary:'₹12–18 LPA', tags:['Python','SQL','Airflow','Azure'], postedAt:Date.now()-86400000*3, description:'Design ETL pipelines and data models.', recruiterId:'seed', logoUrl:'/src/assets/logos/databurst.svg', coverUrl:'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop' },
      { id:id(), title:'Backend Developer', company:'ByteWorks', location:'Bengaluru', type:'Onsite', salary:'₹10–15 LPA', tags:['Django','REST','PostgreSQL'], postedAt:Date.now()-86400000*5, description:'Build scalable APIs using Django.', recruiterId:'seed', logoUrl:'/src/assets/logos/byteworks.svg', coverUrl:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop' }
    ]
    write(LS.jobs, demo)
  }
  if(!read(LS.users)) {
    write(LS.users, [
      { id:id(), name:'Rita Recruiter', email:'recruiter@demo.com', password:'demo', role:'recruiter' },
      { id:id(), name:'Sam Seeker', email:'seeker@demo.com', password:'demo', role:'seeker' }
    ])
  }
  if(!read(LS.applications)) write(LS.applications, [])
})()

export const auth = {
  subscribe(cb){
    const handler = () => cb(auth.getCurrentUser())
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  },
  getCurrentUser(){
    const token = read(LS.session, null)
    if(!token) return null
    const users = read(LS.users, [])
    return users.find(u => u.id === token) || null
  },
  login(email, password){
    const users = read(LS.users, [])
    const u = users.find(x => x.email===email && x.password===password)
    if(!u) throw new Error('Invalid credentials')
    write(LS.session, u.id); return u
  },
  register(payload){
    const users = read(LS.users, [])
    if(users.some(u => u.email===payload.email)) throw new Error('Email already exists')
    const u = { id:id(), ...payload }
    users.push(u); write(LS.users, users)
    write(LS.session, u.id)
    return u
  },
  logout(){ localStorage.removeItem(LS.session) }
}

export const jobs = {
  list({ q='', location='', type='' } = {}){
    let data = read(LS.jobs, [])
    if(q) data = data.filter(j => (j.title+' '+j.company+' '+(j.tags||[]).join(' ')).toLowerCase().includes(q.toLowerCase()))
    if(location) data = data.filter(j => j.location.toLowerCase().includes(location.toLowerCase()))
    if(type) data = data.filter(j => j.type.toLowerCase() === type.toLowerCase())
    return data.sort((a,b)=>b.postedAt-a.postedAt)
  },
  get(id){ return read(LS.jobs, []).find(j=>j.id===id) },
  create(job, recruiterId){
    const data = read(LS.jobs, [])
    const item = { id:id(), postedAt:Date.now(), recruiterId, ...job }
    data.push(item); write(LS.jobs, data); return item
  },
  mine(recruiterId){ return read(LS.jobs, []).filter(j => j.recruiterId===recruiterId).sort((a,b)=>b.postedAt-a.postedAt) }
}

export const applications = {
  apply({ jobId, seekerId, coverLetter, resumeName }){
    const data = read(LS.applications, [])
    const item = { id:id(), jobId, seekerId, coverLetter, resumeName, status:'Submitted', appliedAt:Date.now() }
    data.push(item); write(LS.applications, data); return item
  },
  bySeeker(seekerId){
    const users = read(LS.users, [])
    const jobsData = read(LS.jobs, [])
    return read(LS.applications, []).filter(a=>a.seekerId===seekerId).map(a=>({
      ...a,
      job: jobsData.find(j=>j.id===a.jobId) || null,
      recruiter: users.find(u=>u.id=== (jobsData.find(j=>j.id===a.jobId)||{}).recruiterId) || null
    })).sort((a,b)=>b.appliedAt-a.appliedAt)
  },
  byJob(jobId){
    const users = read(LS.users, [])
    return read(LS.applications, []).filter(a=>a.jobId===jobId).map(a=>({
      ...a,
      seeker: users.find(u=>u.id===a.seekerId) || null
    })).sort((a,b)=>b.appliedAt-a.appliedAt)
  },
  updateStatus(id, status){
    const data = read(LS.applications, [])
    const idx = data.findIndex(a=>a.id===id)
    if(idx>-1){ data[idx].status=status; write(LS.applications, data); return data[idx] }
    return null
  }
}

