
import React from "react";
 
export default function Terms() {
  return (
    <main className="termx-wrap">
      {/* Hero */}
      <section className="termx-hero">
        <div className="container">
          <p className="termx-eyebrow">Legal</p>
          <h1 className="termx-title">Terms & Conditions</h1>
          <p className="termx-sub">
            These Terms govern your use of RecruitHub’s website and services. By
            accessing or using our platform, you agree to these Terms.
          </p>
        </div>
      </section>
 
      {/* Body */}
      <section className="py-5">
        <div className="container termx-content">
          <h5>1. Acceptance of Terms</h5>
          <p>
            By creating an account or using the site, you acknowledge that you
            have read and agree to these Terms and our Privacy Policy.
          </p>
 
          <h5>2. Accounts & Eligibility</h5>
          <p>
            You’re responsible for safeguarding your credentials and for all
            activity under your account. You must be at least 16 years old.
          </p>
 
          <h5>3. User Content</h5>
          <p>
            You retain ownership of content you upload (e.g., resumes, job
            posts). You grant us a limited license to host, display, and process
            this content to provide the service.
          </p>
 
          <h5>4. Acceptable Use</h5>
          <ul>
            <li>No spam or automated scraping.</li>
            <li>No unlawful, misleading, or discriminatory content.</li>
            <li>No attempts to breach security or access others’ data.</li>
          </ul>
 
          <h5>5. Job Listings & Applications</h5>
          <p>
            Recruiters affirm that roles are genuine and accurate. Candidates
            must submit truthful information. We’re not a party to hiring
            agreements.
          </p>
 
          <h5>6. Service Availability</h5>
          <p>
            Services are provided “as is” without warranties. We do not guarantee
            uninterrupted availability or specific hiring outcomes.
          </p>
 
          <h5>7. Limitation of Liability</h5>
          <p>
            To the extent permitted by law, we are not liable for indirect or
            consequential damages arising from your use of the service.
          </p>
 
          <h5>8. Termination</h5>
          <p>
            We may suspend or terminate accounts that violate these Terms. You
            may close your account at any time.
          </p>
 
          <h5>9. Changes</h5>
          <p>
            We may update these Terms periodically. Continued use means you
            accept the updated Terms.
          </p>
 
          <h5>10. Contact</h5>
          <p>
            Questions? Email{" "}
            <a href="mailto:legal@recruithub.example">legal@recruithub.example</a>.
          </p>
 
          <div className="termx-stamp">Last updated: Oct 2025</div>
        </div>
      </section>
    </main>
  );
}
 