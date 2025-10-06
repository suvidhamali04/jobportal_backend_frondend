// import React, { useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../state/AuthContext.jsx'
// import '../../styles.css'; 


// export default function Login(){
//   const { login } = useAuth()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [err, setErr] = useState('')
//   const navigate = useNavigate()
//   const location = useLocation()
//   const from = location.state?.from?.pathname || '/'

//   const onSubmit = (e) => {
//     e.preventDefault()
//     try{
//       login(email, password)
//       navigate(from, { replace:true })
//     } catch(ex){ setErr(ex.message) }
//   }

//   return (
//     <div className="row justify-content-center">
//       <div className="col-md-6 col-lg-5">
//         <div className="card shadow-sm">
//           <div className="card-body p-4">
//             <h3 className="mb-3">Welcome back</h3>
//             {err && <div className="alert alert-danger">{err}</div>}
//             <form onSubmit={onSubmit} className="vstack gap-3">
//               <div>
//                 <label className="form-label">Email</label>
//                 <input className="form-control" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
//               </div>
//               <div>
//                 <label className="form-label">Password</label>
//                 <input className="form-control" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
//               </div>
//               <button className="btn btn-primary" type="submit">Login</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
 

//   )
// }

// import { useEffect, useState } from "react";
// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");

  // optional: scope the fancy styles only on this page
  // useEffect(() => {
  //   document.body.classList.add("auth-page");
  //   return () => document.body.classList.remove("auth-page");
  // }, []);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   setErr("");
    // TODO: your real auth
//     if (!email || !password) {
//       setErr("Email and password are required.");
//       return;
//     }
//     console.log("login:", { email, password });
//   };

//   return (
//     <div className="row justify-content-center">
//       <div className="col-md-6 col-lg-5">
//         <div className="card shadow-sm">
//           <div className="card-body p-4">
//             <h3 className="mb-3">Welcome back</h3>

//             {err && <div className="alert alert-danger">{err}</div>}

//             <form onSubmit={onSubmit} className="vstack gap-3">
//               <div>
//                 <label className="form-label" htmlFor="email">Email</label>
//                 <input
//                   id="email"
//                   className="form-control"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="form-label" htmlFor="password">Password</label>
//                 <input
//                   id="password"
//                   className="form-control"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <button className="btn btn-primary" type="submit">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// correction update

// src/pages/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/AuthContext.jsx';

export default function Login(){
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('auth-page');
    return () => document.body.classList.remove('auth-page');
  }, []);

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);        // ✅ pass { email, password }
      navigate('/');            // ✅ after login go to home
    } catch (ex) {
      setErr(ex.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-7 col-lg-6 ">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h3 className="mb-3">Login</h3>
            {err && <div className="alert alert-danger">{err}</div>}

            <form onSubmit={onSubmit} className="row g-3">
              <div className="col-md-12">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="col-12">
                <button className="btn btn-primary" type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
