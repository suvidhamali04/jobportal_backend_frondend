import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';
 
export default function Navbar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
 
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
 
  return (
    <nav className="navbar navbar-expand-lg hpnav hpnav--bleed">
      <div className="hpnav-bg" aria-hidden="true"></div>
 
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 hpnav-brand" to="/">
          <span className="hpnav-logo">R</span>
          <span>RecruitHub</span>
        </Link>
 
        <button
          className="navbar-toggler hpnav-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
 
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => 'nav-link hpnav-link' + (isActive ? ' active' : '')}
                end
              >
                Home
              </NavLink>
            </li>
 
           
              <li className="nav-item">
                <NavLink className="nav-link hpnav-link" to="/jobs">Jobs</NavLink>
              </li>
          
          </ul>
 
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) => 'nav-link hpnav-link btn11' + (isActive ? ' active' : '')}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className={({ isActive }) => 'nav-link hpnav-link btn11' + (isActive ? ' active' : '')}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
 
            {user && (
              <>
                {user.role === 'seeker' ? (
                  <li className="nav-item">
                    <NavLink
                      to="/dashboard/seeker"
                      className={({ isActive }) => 'nav-link hpnav-link' + (isActive ? ' active' : '')}
                    >
                      My Applications
                    </NavLink>
                  </li>
                ) : (
                  <li className="nav-item">
                    <NavLink
                      to="/dashboard/recruiter"
                      className={({ isActive }) => 'nav-link hpnav-link' + (isActive ? ' active' : '')}
                    >
                      My Jobs
                    </NavLink>
                  </li>
                )}
 
                <li className="nav-item">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) => 'nav-link hpnav-link' + (isActive ? ' active' : '')}
                  >
                    Profile
                  </NavLink>
                </li>
 
                <li className="nav-item">
                  <button
                    className="btn11 btn-sm hpnav-logout ms-lg-2 mt-2 mt-lg-0"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}