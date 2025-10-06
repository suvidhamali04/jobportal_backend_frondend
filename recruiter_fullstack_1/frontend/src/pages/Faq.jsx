import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
 
const RAW_FAQ = [
  { q: "How do I create a candidate account?", a: "Go to Register → choose Job Seeker → fill your details. You can later add your resume and skills from Profile." },
  { q: "How do I post a job as a recruiter?", a: "Create a recruiter account, then open Post a Job from the navbar. Fill in job title, description, skills, location, and publish." },
  { q: "Can I edit or delete my job posts?", a: "Yes. Go to Dashboard → My Jobs. You can edit or close the posting at any time." },
  { q: "How do applications work?", a: "Candidates apply from the Job page. Recruiters review and update status (Shortlisted/Rejected/Hired) in their dashboard." },
  { q: "What file types are supported for resumes?", a: "PDF and DOCX are supported. We recommend PDF for best parsing and preview." },
  { q: "Is my data secure?", a: "We use secure transport (HTTPS) and follow best practices for data protection. See our Privacy page for full details." },
  { q: "How do I reset my password?", a: "Use the Forgot Password link on the Login page. If you don’t see the email, check your spam folder." },
  { q: "Do you support remote or hybrid jobs?", a: "Yes—use filters on the Jobs page to find remote, hybrid, or on-site roles." },
];
 
export default function Faq() {
  const [query, setQuery] = useState("");
 
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return RAW_FAQ;
    return RAW_FAQ.filter(
      item =>
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q)
    );
  }, [query]);
 
  return (
    <main className="faqx-wrapper">
      {/* Hero / header */}
      <section className="faqx-hero">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <p className="faqx-eyebrow">Help Center</p>
              <h1 className="faqx-title">Frequently Asked Questions</h1>
              <p className="faqx-sub">
                Quick answers about accounts, jobs, applications, and more. Still stuck?
                <span className="ms-1">Reach out to our</span>{" "}
                <Link to="/support" className="faqx-link">Support team</Link>.
              </p>
 
              {/* Search */}
              <div className="faqx-search shadow-sm">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search FAQs…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search FAQs"
                />
                <span className="faqx-search-ico" aria-hidden>🔎</span>
              </div>
            </div>
 
            {/* Helpful quick links */}
            <div className="col-lg-5">
              <div className="faqx-quick grid">
                <Link to="/register" className="faqx-quick-card">
                  <span className="faqx-quick-ico">🆕</span>
                  <span>Create an account</span>
                </Link>
                <Link to="/jobs" className="faqx-quick-card">
                  <span className="faqx-quick-ico">💼</span>
                  <span>Browse jobs</span>
                </Link>
                <Link to="/post-job" className="faqx-quick-card">
                  <span className="faqx-quick-ico">📣</span>
                  <span>Post a job</span>
                </Link>
                <Link to="/dashboard/seeker" className="faqx-quick-card">
                  <span className="faqx-quick-ico">📄</span>
                  <span>Track applications</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* FAQ list */}
      <section className="py-5">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="alert alert-info">
              No results for <strong>{query}</strong>. Try a different keyword.
            </div>
          ) : (
            <div className="accordion" id="faqx-accordion">
              {filtered.map((item, i) => {
                const headingId = `faqx-h-${i}`;
                const collapseId = `faqx-c-${i}`;
                return (
                  <div className="accordion-item faqx-item" key={i}>
                    <h2 className="accordion-header" id={headingId}>
                      <button
                        className={`accordion-button ${i !== 0 ? "collapsed" : ""}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${collapseId}`}
                        aria-expanded={i === 0 ? "true" : "false"}
                        aria-controls={collapseId}
                      >
                        {item.q}
                      </button>
                    </h2>
                    <div
                      id={collapseId}
                      className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`}
                      aria-labelledby={headingId}
                      data-bs-parent="#faqx-accordion"
                    >
                      <div className="accordion-body">
                        {item.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
 
          {/* Contact card */}
          <div className="faqx-contact card border-0 shadow-sm mt-4">
            <div className="card-body d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3">
              <div className="faqx-contact-ico">💬</div>
              <div className="me-auto">
                <h5 className="mb-1">Didn’t find what you need?</h5>
                <div className="text-muted">We’re here to help—get a reply within 24 hours.</div>
              </div>
             <a
      href="tel:9867541245"          // <-- put your real number here
      className="btn btn-primary"
      aria-label="Call support"
    >
      Call support
    </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}