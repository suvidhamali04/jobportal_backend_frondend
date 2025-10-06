
import React from "react";
 
export default function Privacy() {
  return (
    <main className="privx-wrap">
      {/* Hero */}
      <section className="privx-hero">
        <div className="container">
          <p className="privx-eyebrow">Legal</p>
          <h1 className="privx-title">Privacy Policy</h1>
          <p className="privx-sub">
            This policy explains what data we collect, how we use it, and the
            choices you have.
          </p>
        </div>
      </section>
 
      {/* Body */}
      <section className="py-5">
        <div className="container privx-content">
          <h5>1. Information We Collect</h5>
          <ul>
            <li>
              <strong>Account info</strong>: name, email, role (seeker/recruiter).
            </li>
            <li>
              <strong>Profile & job data</strong>: resumes, skills, job posts,
              applications, status changes.
            </li>
            <li>
              <strong>Usage data</strong>: device/browser, pages visited, basic
              analytics.
            </li>
          </ul>
 
          <h5>2. How We Use Data</h5>
          <ul>
            <li>Provide core features like posting, searching, and applying.</li>
            <li>Secure the platform and prevent abuse.</li>
            <li>Improve UX and troubleshoot issues.</li>
          </ul>
 
          <h5>3. Sharing</h5>
          <p>
            We share data with your consent (e.g., resume with recruiters when
            you apply) and with service providers who support our operations.
          </p>
 
          <h5>4. Security</h5>
          <p>
            We use reasonable technical and organizational measures to protect
            your data. No method is 100% secure, so please keep your credentials
            safe.
          </p>
 
          <h5>5. Data Retention</h5>
          <p>
            We retain data while your account is active and as needed to provide
            the service or comply with legal obligations.
          </p>
 
          <h5>6. Your Choices</h5>
          <ul>
            <li>Access, update, or delete your profile and resumes.</li>
            <li>Withdraw applications or close your account.</li>
            <li>Contact us for privacy requests.</li>
          </ul>
 
          <h5>7. Children’s Privacy</h5>
          <p>Our services aren’t directed to children under 16.</p>
 
          <h5>8. Changes</h5>
          <p>
            We may update this Policy. We’ll post the new version with an
            updated date.
          </p>
 
          <h5>9. Contact</h5>
          <p>
            Privacy questions? Email{" "}
            <a href="mailto:privacy@recruithub.example">privacy@recruithub.example</a>.
          </p>
 
          <div className="privx-stamp">Last updated: Oct 2025</div>
        </div>
      </section>
    </main>
  );
}
 
 