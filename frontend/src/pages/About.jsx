import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="container py-5 my-md-4">
      {/* ─── Hero Heading ─── */}
      <section className="mb-5">
        <h1
          className="fw-bolder text-white mb-4"
          style={{
            fontSize: '4.8rem',
            letterSpacing: '-2px',
            lineHeight: '1.0',
            fontWeight: '800',
          }}
        >
          Built By Students,<br />
          For Students<span style={{ color: 'var(--accent-lime)' }}>.</span>
        </h1>

        {/* ─── 2-Column Subtitle Row (Matching Screenshot) ─── */}
        <div className="row g-4 align-items-start mb-5 pb-2">
          <div className="col-lg-5">
            <p
              className="mb-0"
              style={{
                fontSize: '1.45rem',
                fontStyle: 'italic',
                color: '#e5e5e5',
                fontWeight: '300',
                lineHeight: '1.35',
              }}
            >
              A circular campus economy without middleman markups.
            </p>
          </div>
          <div className="col-lg-7">
            <p
              className="mb-0"
              style={{
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#999999',
                fontWeight: '400',
              }}
            >
              CampusTrade was created to solve a simple problem: every semester, students graduate or
              move hostels with valuable gear, while freshers struggle with high retail prices. We
              connect students directly for fast, verified peer-to-peer exchanges.
            </p>
          </div>
        </div>

        {/* ─── 3 Value Cards (Matching Screenshot) ─── */}
        <div className="row g-4 pt-3">
          <div className="col-md-4">
            <div
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '28px 24px',
                height: '100%',
              }}
            >
              <span style={{ fontSize: '1.8rem', marginBottom: '16px', display: 'block' }}>🎯</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>
                Our Mission
              </h3>
              <p style={{ color: '#888888', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: 0 }}>
                To reduce student living costs by empowering a transparent, campus-wide circular exchange of
                books, gadgets, and room needs.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '28px 24px',
                height: '100%',
              }}
            >
              <span style={{ fontSize: '1.8rem', marginBottom: '16px', display: 'block' }}>🛡️</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>
                Campus Safety First
              </h3>
              <p style={{ color: '#888888', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: 0 }}>
                Trade with confidence. All sellers are verified students, making in-person campus meetups
                completely safe and trustworthy.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '28px 24px',
                height: '100%',
              }}
            >
              <span style={{ fontSize: '1.8rem', marginBottom: '16px', display: 'block' }}>⚡</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>
                Zero Shipping Delays
              </h3>
              <p style={{ color: '#888888', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: 0 }}>
                Skip the courier fees. Find what you need right in your campus hostel or library and pick it
                up within minutes.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Call to Action Banner ─── */}
        <div
          className="mt-5 p-4 p-md-5 text-center"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
          }}
        >
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', marginBottom: '10px' }}>
            Have items you want to pass on?
          </h2>
          <p
            className="mx-auto mb-4"
            style={{ maxWidth: '520px', color: '#888888', fontSize: '0.95rem', lineHeight: '1.6' }}
          >
            List your books, calculators, or devices in seconds and connect with verified buyers on campus today.
          </p>
          <Link to="/products/add" className="btn-lime">
            List An Item Now ↗
          </Link>
        </div>
      </section>
    </div>
  );
}
