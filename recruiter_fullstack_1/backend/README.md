# Recruiter Backend (MERN)

## Features
- Node.js + Express server
- MongoDB (Mongoose)
- JWT-based authentication (users + admins)
- REST APIs for jobs, users, applications
- Admin routes for managing users and jobs
- Seed script to create an admin user

## Quick start
1. Copy `.env.example` to `.env` and set values (MONGO_URI, JWT_SECRET ...)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run seed to create admin (optional):
   ```bash
   npm run seed
   ```
4. Start server:
   ```bash
   npm run dev
   ```

## Sample .env (already provided as .env.example)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/recruiterdb
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=AdminPass123
```

## API Endpoints (summary)
- POST /api/auth/register — register a user
- POST /api/auth/login — login, returns token
- GET /api/jobs — list jobs (public)
- GET /api/jobs/:id — get job details
- POST /api/jobs — create job (authenticated)
- PUT /api/jobs/:id — update job (authenticated)
- DELETE /api/jobs/:id — delete job (authenticated)
- POST /api/applications — apply for job (authenticated)
- GET /api/applications/me — get my applications (authenticated)
- GET /api/applications/job/:jobId — get applications for a job (authenticated)
- PUT /api/applications/:id/status — update application status (authenticated)
- ADMIN PROTECTED (requires admin token):
  - GET /api/admin/users — list users
  - DELETE /api/admin/users/:id — delete user
  - GET /api/admin/jobs — list all jobs
