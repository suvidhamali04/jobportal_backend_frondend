# Recruitr — React + Bootstrap (Frontend Template)

A frontend-only template for a recruitment platform built with React (Vite) and Bootstrap 5.  
No backend required: a small mock API stores data in your browser (localStorage).

## Features
- Role-based UX: **Recruiter** and **Job Seeker**
- Auth screens (mock login/register)
- Job listing with filters (search, location, type)
- Job detail + apply flow (upload field recorded as filename only)
- Recruiter: Post job + dashboard to view applicants and update status
- Job Seeker: Applications dashboard with status tracking
- Profile page
- Responsive layout with Bootstrap 5

## Quick Start
```bash
# 1) Extract the zip
# 2) Open folder in terminal
npm install
npm run dev
# visit the printed local URL
```

## Demo Accounts
- Recruiter — email: `recruiter@demo.com` / password: `demo`
- Job Seeker — email: `seeker@demo.com` / password: `demo`

## Notes
- This is a **frontend template**. Replace `src/utils/mockApi.js` with real API calls to your Flask/Django backend.
- File uploads here are not transmitted; only the filename is saved.
- To reset data, clear your browser storage for the site.

## Suggested Backend Endpoints (future)
- `POST /auth/login`, `POST /auth/register`, `POST /auth/logout`
- `GET /jobs`, `POST /jobs`, `GET /jobs/:id`
- `POST /jobs/:id/applications`, `GET /jobs/:id/applications`
- `GET /me/applications`, `PATCH /applications/:id`
