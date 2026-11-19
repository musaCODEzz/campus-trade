import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container py-5 my-md-4">
      {/* ─── Hero Section ─── */}
      <section className="mb-5 pb-lg-3">
        {/* Giant 2-Line Heading */}
        <h1
          className="fw-bolder text-white mb-4"
          style={{
            fontSize: '5rem',
            letterSpacing: '-2px',
            lineHeight: '0.95',
            fontWeight: '800',
          }}
        >
          Campus<br />
          Trade<span style={{ color: 'var(--accent-lime)' }}>.</span>
        </h1>

        {/* 2-Column Subtitle Row */}
        <div className="row g-4 align-items-start mb-4 pb-2">
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
              Buy, sell &amp; pass on gear with verified students.
            </p>
          </div>
          <div className="col-lg-7">
            <p
              className="mb-0"
              style={{
                fontSize: '1.05rem',
                lineHeight: '1.75',
                color: '#999999',
                fontWeight: '400',
              }}
            >
              A simple campus marketplace built for university students. From course textbooks and calculators
              to laptops and hostel room essentials, trade safely face-to-face on campus grounds.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex flex-wrap gap-3 mt-4">
          <Link to="/products" className="btn-lime">
            EXPLORE ITEMS ↗
          </Link>
          <Link to="/products/add" className="btn-outline-custom">
            POST AN ITEM
          </Link>
        </div>
      </section>

      {/* ─── 3 Feature Cards (Matching Clean Dark Style) ─── */}
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
            <h3 style={{ fontSize: '1.18rem', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>
              📚 Textbooks &amp; Course Notes
            </h3>
            <p style={{ color: '#888888', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: 0 }}>
              Pass on your semester materials to fellow students at fair, student-friendly prices.
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
            <h3 style={{ fontSize: '1.18rem', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>
              💻 Laptops &amp; Engineering Gear
            </h3>
            <p style={{ color: '#888888', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: 0 }}>
              Verified electronics, scientific calculators, and hardware tested by fellow peers.
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
            <h3 style={{ fontSize: '1.18rem', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>
              🛋️ Hostel &amp; Room Furnishings
            </h3>
            <p style={{ color: '#888888', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: 0 }}>
              Kettles, study lamps, curtains, and furniture for smooth campus relocation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
