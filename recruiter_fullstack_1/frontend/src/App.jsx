import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './state/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import JobsList from './pages/jobs/JobsList.jsx'
import JobDetail from './pages/jobs/JobDetail.jsx'
import PostJob from './pages/jobs/PostJob.jsx'
import ApplyJob from './pages/apply/ApplyJob.jsx'
import SeekerDashboard from './pages/dashboards/SeekerDashboard.jsx'
import RecruiterDashboard from './pages/dashboards/RecruiterDashboard.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Faq from './pages/Faq.jsx'
import Terms from "./pages/Terms.jsx"
import Privacy from "./pages/Privacy.jsx"

export default function App(){
  const { user } = useAuth()
  return (
    <div className="app-shell">
      <Navbar/>
      <main className="app-main">
        <div className="container py-4">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register/>} />
            <Route path="/jobs" element={<JobsList/>} />
            <Route path="/jobs/:id" element={<JobDetail/>} />
            <Route path="/apply/:id" element={<ProtectedRoute role="seeker"><ApplyJob/></ProtectedRoute>} />
            <Route path="/post-job" element={<ProtectedRoute role="recruiter"><PostJob/></ProtectedRoute>} />
            <Route path="/dashboard/seeker" element={<ProtectedRoute role="seeker"><SeekerDashboard/></ProtectedRoute>} />
            <Route path="/dashboard/recruiter" element={<ProtectedRoute role="recruiter"><RecruiterDashboard/></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
            <Route path="*" element={<NotFound/>} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
