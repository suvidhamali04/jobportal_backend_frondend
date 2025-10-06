// import React from 'react'
// export default function Footer(){
//   return (
//     <footer className="py-4">
//       <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
//         <div>© {new Date().getFullYear()} Recruitr</div>
//         {/* <div className="text-muted">React + Bootstrap • Frontend template</div> */}
//       </div>
//     </footer>
//   )
// }

// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer(){
  return (
    <footer className="hpfoot hpfoot--bleed">
      {/* background image + overlay */}
      <div className="hpfoot-bg" aria-hidden="true"></div>

      <div className="container py-5">
        {/* Top brand + socials */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
          <div>
            <Link to="/" className="hpfoot-brand text-decoration-none">
              <span className="hpfoot-logo">R</span> RecruitHub
            </Link>
            <div className="hpfoot-tagline">Find your next role — or your next hire.</div>
          </div>

        <nav className="hpfoot-social" aria-label="Social">
  <a className="hpfoot-social__link hpfoot--linkedin" href="https://www.linkedin.com" aria-label="LinkedIn">
    {/* LinkedIn SVG */}
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zM8.5 8h3.8v2.2h.05c.53-1 1.83-2.2 3.76-2.2 4.02 0 4.77 2.65 4.77 6.1V24h-4v-6.6c0-1.58-.03-3.62-2.2-3.62-2.2 0-2.53 1.72-2.53 3.5V24h-4V8z"/></svg>
  </a>
  <a className="hpfoot-social__link hpfoot--x" href="https://twitter.com" aria-label="X">
    {/* X/Twitter */}
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2H21.5l-7.5 8.566L22.5 22h-5.844l-4.57-5.303L6.8 22H3.543l8.038-9.183L1.9 2h5.97l4.137 4.734L18.244 2Zm-2.045 18h1.595L7.884 4h-1.65l9.965 16Z"/></svg>
  </a>
  <a className="hpfoot-social__link hpfoot--facebook" href="https://facebook.com" aria-label="Facebook">
    {/* Facebook */}
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5 3.66 9.15 8.44 9.93v-7.03H7.9v-2.9h2.4v-2.21c0-2.37 1.41-3.68 3.56-3.68 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.17 0-1.53.72-1.53 1.46v1.94h2.6l-.42 2.9h-2.18V22c4.78-.78 8.44-4.93 8.44-9.93Z"/></svg>
  </a>
  <a className="hpfoot-social__link hpfoot--youtube" href="https://youtube.com" aria-label="YouTube">
    {/* YouTube */}
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31.9 31.9 0 0 0 0 12c0 1.98.18 3.92.5 5.8a3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1c.32-1.88.5-3.82.5-5.8 0-1.98-.18-3.92-.5-5.8ZM9.6 15.5v-7l6.2 3.5-6.2 3.5Z"/></svg>
  </a>
  <a className="hpfoot-social__link hpfoot--instagram" href="https://instagram.com" aria-label="Instagram">
    {/* Instagram */}
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="20" height="20" rx="5" ry="5"></rect>
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M17.5 6.5h.01"></path>
  </svg>
  </a>
</nav>

        </div>

        {/* Links grid */}
        <div className="row g-4">
          <div className="col-6 col-md-3">
            <h6 className="hpfoot-head">For Candidates</h6>
            <ul className="hpfoot-links">
              <li><Link to="/jobs">Browse Jobs</Link></li>
              <li><Link to="/dashboard/seeker">My Applications</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/register">Create Account</Link></li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h6 className="hpfoot-head">For Recruiters</h6>
            <ul className="hpfoot-links">
              <li><Link to="/post-job">Post a Job</Link></li>
              <li><Link to="/dashboard/recruiter">My Jobs</Link></li>
            
              <li><Link to="/login">Recruiter Login</Link></li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h6 className="hpfoot-head">Resources</h6>
            <ul className="hpfoot-links">
            
            
              <li><Link to="/faq">FAQs</Link></li>
              {/* <li><Link to="/support">Help Center</Link></li> */}
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h6 className="hpfoot-head">Legal</h6>
            <ul className="hpfoot-links">
              <li><Link to="/terms">Terms</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
        
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2 mt-4 pt-3 hpfoot-bottom">
          <div>© {new Date().getFullYear()} <strong>Recruitr</strong>. All rights reserved.</div>
         
        </div>
      </div>

      {/* Back to top */}
      <button
        className="hpfoot-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        title="Back to top"
      >
        ↑
      </button>
    </footer>
  );
}
