import React from 'react'
import { Link } from 'react-router-dom'
import CompanyStrip from "../components/companystrip.jsx"

const avatars = [
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop'
]

export default function Home(){
  return (
    <>
     {/* FULL HERO */}
<section className="hero hero--bleed">
  <div className="container py-4 py-lg-5">
    <div className="row g-4 align-items-center">
      {/* Left copy */}
      <div className="col-12 col-lg-6 order-2 order-lg-1">
        {/* <span className="badge badge-soft mb-2">New</span> */}
        <h1 className="display-6 display-lg-5 fw-bold mb-2">
          Find your next role — or your next hire.
        </h1>
        <p className="lead text-ink-300 mb-3 mb-lg-4 text-justify">
          Whether you’re a professional seeking new opportunities or an employer searching for top talent,
          we make the right connections simple.
        </p>

        <div className="d-flex flex-wrap gap-2">
          <a href="/jobs" className="btn11 btn-primary btn-lg">Browse Jobs</a>
          <a href="/post-job" className="btn11 btn-outline-primary btn-lg">Post a Job</a>
        </div>

        {/* Trust row */}
        <div className="d-flex align-items-center gap-2 mt-3">
          <img className="avatar" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop" alt="user" />
          <img className="avatar" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=300&auto=format&fit=crop" alt="user" />
          <img className="avatar" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop" alt="user" />
          <div className="text-ink-300 small">
            <strong>1,200+</strong> candidates • <strong>200+</strong> companies
          </div>
        </div>
      </div>

      {/* Right artwork */}
      <div className="col-12 col-lg-6 order-1 order-lg-2">
        <div
          className="hero-art shadow-sm"
          role="img"
          aria-label="People collaborating"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop)"
          }}
        />
      </div>
    </div>

    {/* Stats strip */}
    {/* <div className="row g-3 mt-3 mt-lg-4">
      {[
        {n:"4.8★", l:"Candidate Rating"},
        {n:"8k+", l:"Applications"},
        {n:"1.2k", l:"Open Roles"},
        {n:"2d",  l:"Avg. Time to Apply"},
      ].map((s, i)=>(
        <div key={i} className="col-6 col-md-3">
          <div className="stat">
            <div className="stat-n">{s.n}</div>
            <div className="stat-l">{s.l}</div>
          </div>
        </div>
      ))}
    </div> */}
    {/* COLORFUL STATS (3 only, with counter) */}
<div className="row g-3 mt-3 mt-lg-4">
  {/* tiny CountUp component (inline) */}
  {(() => {
    const CountUp = ({ end = 0, duration = 1200, decimals = 0, format }) => {
      const ref = React.useRef(null);
      const [val, setVal] = React.useState(0);
      const [started, setStarted] = React.useState(false);

      React.useEffect(() => {
        // start only when visible
        const node = ref.current;
        if (!node) return;
        const io = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && !started) {
              setStarted(true);
            }
          },
          { threshold: 0.3 }
        );
        io.observe(node);
        return () => io.disconnect();
      }, [started]);

      React.useEffect(() => {
        if (!started) return;
        let raf, start;
        const d = Math.max(300, duration);

        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min(1, (ts - start) / d);
          const current = end * p;
          setVal(current);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
      }, [started, end, duration]);

      const display =
        typeof format === "function"
          ? format(val)
          : val.toFixed(decimals);

      return <span ref={ref}>{display}</span>;
    };

    const kFmt = (n) => {
      if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
      if (n >= 1000) return (n / 1000).toFixed(1) + "k";
      return Math.round(n).toString();
    };
    const kFmtPlus = (n) => {
      if (n >= 1000) return (n / 1000).toFixed(0) + "k+";
      return Math.round(n) + "+";
    };

    const stats = [
      {
        label: "Candidate Rating",
        className: "stat stat--a",
        node: (
          <>
            <CountUp end={4.8} duration={1200} decimals={1} />★
          </>
        ),
      },
      {
        label: "Applications",
        className: "stat stat--b",
        node: <CountUp end={8000} duration={1400} format={kFmtPlus} />,
      },
      {
        label: "Open Roles",
        className: "stat stat--c",
        node: <CountUp end={1200} duration={1400} format={kFmt} />,
      },
    ];

    return stats.map((s, i) => (
      <div key={i} className="col-12 col-sm-6 col-md-4">
        <div className={s.className}>
          <div className="stat-n">{s.node}</div>
          <div className="stat-l">{s.label}</div>
        </div>
      </div>
    ));
  })()}
</div>

  </div>
</section>

{/* company strip */}
     <CompanyStrip speed={50} />

      {/* <div className="row g-4">
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5>For Job Seekers</h5>
              <p className="text-muted">Search, filter, and apply in minutes. Track every application in a clean dashboard.</p>
              <Link to="/jobs" className="btn btn-outline-secondary">Explore Jobs</Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5>For Recruiters</h5>
              <p className="text-muted">Publish openings, review applicants, and shortlist with one click.</p>
              <Link to="/post-job" className="btn btn-outline-secondary">Post a Job</Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5>Ready to Integrate</h5>
              <p className="text-muted">Swap our mock API with your Flask/Django endpoints—no UI changes needed.</p>
              <Link to="/register" className="btn btn-outline-secondary">Create Account</Link>
            </div>
          </div>
        </div>
      </div> */}
      <div className="row g-4">
  {/* Card A — Job Seekers */}
  <div className="col-12 col-lg-6">
    <Link to="/jobs" className="hpfeat-card hpfeat-card--seek d-flex flex-column h-100 text-decoration-none">
      <div className="hpfeat-ico" aria-hidden="true">
        {/* briefcase */}
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path fill="currentColor" d="M10 4h4a2 2 0 0 1 2 2v1h2a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h2V6a2 2 0 0 1 2-2Zm0 3h4V6h-4v1Z"/>
        </svg>
      </div>
      <h5 className="mb-2">For Job Seekers</h5>
      <p className="mb-3 hpfeat-ink-300">
        Search, filter, and apply in minutes. Track every application in a clean dashboard.
      </p>
      <div className="mt-auto">
        <span className="btn11 btn-light  fw-semibold btn11--sm btn11--lg">Explore Jobs →</span>
      </div>
    </Link>
  </div>

  {/* Card B — Recruiters */}
  <div className="col-12 col-lg-6">
    <Link to="/post-job" className="hpfeat-card hpfeat-card--recr d-flex flex-column h-100 text-decoration-none">
      <div className="hpfeat-ico" aria-hidden="true">
        {/* megaphone */}
          <svg viewBox="0 0 24 24" width="22" height="22">
          <path fill="currentColor" d="M10 4h4a2 2 0 0 1 2 2v1h2a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h2V6a2 2 0 0 1 2-2Zm0 3h4V6h-4v1Z"/>
        </svg>
      </div>
      <h5 className="mb-2">For Recruiters</h5>
      <p className="mb-3 hpfeat-ink-300">
        Publish openings, review applicants, with one click.
      </p>
      <div className="mt-auto">
        <span className="btn11 btn-light btn-sm fw-semibold btn11--sm btn11--lg">Post a Job →</span>
      </div>
    </Link>
  </div>
</div>


 


      {/* <div className="row g-4 mt-1">
        <div className="col-lg-6">
          <div className="testimonial">
            <div className="d-flex align-items-center gap-3 mb-2">
              <img className="avatar" src={avatars[0]} alt="avatar"/>
              <div>
                <strong>Sam Seeker</strong><div className="text-muted small">Frontend Developer</div>
              </div>
            </div>
            “The application flow is smooth and fast. I applied to three roles and heard back the same day.”
          </div>
        </div>
        <div className="col-lg-6">
          <div className="testimonial">
            <div className="d-flex align-items-center gap-3 mb-2">
              <img className="avatar" src={avatars[1]} alt="avatar"/>
              <div>
                <strong>Rita Recruiter</strong><div className="text-muted small">Talent Lead, Acme Inc.</div>
              </div>
            </div>
            “Posting a job and shortlisting applicants takes minutes. The dashboard is exactly what we needed.”
          </div>
        </div>
      </div> */}

      {/* TESTIMONIALS */}
<section className="hptest mt-4 mt-lg-5">
  <div className="text-center mb-3">
    <span className="hptest-kicker">What people say</span>
    <h3 className="hptest-title">Testimonials</h3>
    <p className="hptest-sub">Real feedback from candidates and recruiters who use our platform.</p>
  </div>

  <div className="row g-4">
    {/* Card 1 */}
    <div className="col-12 col-lg-6">
      <article className="hptest-card hptest-card--blue h-100">
        <div className="d-flex align-items-center gap-3 mb-2">
          <img className="hptest-avatar" src={avatars[0]} alt="Sam Seeker avatar"/>
          <div className="flex-grow-1">
            <strong>Sam Seeker</strong>
            <div className="text-muted small">Frontend Developer</div>
          </div>
          {/* Stars */}
          <div className="hptest-stars" aria-label="5 star rating">
            <span>★</span><span>★</span><span>★</span><span>★</span><span className="dim">★</span>
          </div>
        </div>


<p className="mb-0">
  “The job portal made my entire experience seamless — from creating a profile to applying for jobs. I quickly found roles matching my skills, and the application process was simple and fast. Within days, I connected with recruiters and secured interviews, making this platform a game-changer for my career.”
</p>      </article>
    </div>

    {/* Card 2 */}
    <div className="col-12 col-lg-6">
      <article className="hptest-card hptest-card--rose h-100">
        <div className="d-flex align-items-center gap-3 mb-2">
          <img className="hptest-avatar" src={avatars[1]} alt="Rita Recruiter avatar"/>
          <div className="flex-grow-1">
            <strong>Rita Recruiter</strong>
            <div className="text-muted small">Talent Lead, Acme Inc.</div>
          </div>
          {/* Stars */}
          <div className="hptest-stars" aria-label="5 star rating">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
        </div>


<p className="mb-0">
  “This platform made job searching so much easier. The application process was smooth, I found relevant opportunities quickly, and I was able to connect with recruiters in no time. It truly saved me effort and helped me move forward in my career.”
</p>      </article>
    </div>
  </div>
</section>

    </>
  )
}
