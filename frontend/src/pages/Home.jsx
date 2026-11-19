import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container py-5 my-md-4">
      {/* ─── Hero Section ─── */}
      <section className="mb-5 pb-lg-4">
        {/* Giant 2-Line Heading */}
        <h1
          className="fw-bolder text-white mb-4"
          style={{ fontSize: '5rem', letterSpacing: '-2px', lineHeight: '0.95' }}
        >
          Campus<br />
          Trade<span style={{ color: 'var(--accent-lime)' }}>.</span>
        </h1>

        {/* 2-Column Subtitle Row from Screenshot 1 */}
        <div className="row g-4 align-items-start mb-4 pb-2">
          <div className="col-lg-5">
            <p
              className="mb-0"
              style={{
                fontSize: '1.45rem',
                fontStyle: 'italic',
                color: '#e5e5e5',
                fontWeight: '300',
                lineHeight: '1.3',
              }}
            >
              Buy, sell &amp; pass on gear with verified students.
            </p>
          </div>
          <div className="col-lg-7">
            <p
              className="mb-0"
              style={{
                fontSize: '1.15rem',
                lineHeight: '1.75',
                color: '#e2e8f0',
                fontWeight: '400',
              }}
            >
              A simple campus marketplace built for university students. From{' '}
              <strong className="text-white">course textbooks</strong> and{' '}
              <strong className="text-white">calculators</strong> to{' '}
              <strong className="text-white">laptops</strong> and{' '}
              <strong className="text-white">hostel room essentials</strong>, trade safely
              face-to-face on campus grounds.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex flex-wrap gap-3">
          <Link to="/products" className="btn-lime">
            EXPLORE ITEMS ↗
          </Link>
          <Link to="/products/add" className="btn-outline-custom">
            POST AN ITEM
          </Link>
        </div>
      </section>

      {/* ─── Category Cards Grid ─── */}
      <div className="row g-4 pt-4 border-top border-secondary border-opacity-25">
        <div className="col-md-4">
          <div className="dark-card">
            <h3 className="h5 fw-bold mb-2 text-white">📚 Textbooks &amp; Course Notes</h3>
            <p className="text-secondary small mb-0">
              Pass on your semester materials to fellow students at fair, student-friendly prices.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dark-card">
            <h3 className="h5 fw-bold mb-2 text-white">💻 Laptops &amp; Engineering Gear</h3>
            <p className="text-secondary small mb-0">
              Verified electronics, scientific calculators, and hardware tested by fellow peers.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dark-card">
            <h3 className="h5 fw-bold mb-2 text-white">🛋️ Hostel &amp; Room Furnishings</h3>
            <p className="text-secondary small mb-0">
              Kettles, study lamps, curtains, and furniture for smooth campus relocation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}