import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getProduct(id);
        setProduct(data);
      } catch {
        setError('This item could not be found. It may have been removed.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const getCategoryLabel = (cat) => {
    const categories = {
      textbooks: '📚 TEXTBOOKS & NOTES',
      electronics: '💻 LAPTOPS & ELECTRONICS',
      hostel: '🛋️ HOSTEL & FURNISHINGS',
      appliances: '🍳 KITCHEN & APPLIANCES',
      fashion: '👟 FASHION & WEARABLES',
      other: '📦 OTHER ITEMS',
    };
    return categories[cat] || cat?.toUpperCase();
  };

  const getConditionLabel = (cond) => {
    const conditions = {
      brand_new: 'Brand New',
      like_new: 'Like New / Barely Used',
      fair: 'Good / Fair Condition',
    };
    return conditions[cond] || cond;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border my-5" style={{ color: 'var(--accent-lime)' }} role="status"></div>
        <p className="text-secondary">Loading item details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="display-1 mb-3">🔍</div>
        <h2 className="text-white mb-3">Item Not Found</h2>
        <p className="text-secondary mb-4">{error}</p>
        <button onClick={() => navigate('/products')} className="btn-lime">
          ← Back to Marketplace
        </button>
      </div>
    );
  }

  const mailtoHref = product.seller_email
    ? `mailto:${product.seller_email}?subject=${encodeURIComponent(`CampusTrade: ${product.title}`)}&body=${encodeURIComponent(`Hi, I am interested in your listing: ${product.title} listed at Ksh ${product.price} on CampusTrade.`)}`
    : `mailto:?subject=${encodeURIComponent(`CampusTrade: ${product.title}`)}&body=${encodeURIComponent(`Hi, I am interested in your listing: ${product.title} listed at Ksh ${product.price} on CampusTrade.`)}`;

  return (
    <div className="container py-5">
      {/* ─── Back to Marketplace ─── */}
      <button
        type="button"
        onClick={() => navigate('/products')}
        className="btn p-0 mb-4 text-decoration-none d-inline-flex align-items-center"
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          fontWeight: '500',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
      >
        ← Back to Marketplace
      </button>

      <div className="row g-4 align-items-start">
        {/* ─── Left Column: Product Details ─── */}
        <div className="col-lg-8">
          <div
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '36px',
            }}
          >
            {/* Category + Condition Row */}
            <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--accent-lime)',
                }}
              >
                {getCategoryLabel(product.category)}
              </span>
              <span
                style={{
                  fontSize: '0.78rem',
                  color: '#999999',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '3px 10px',
                  borderRadius: '4px',
                }}
              >
                Condition: {getConditionLabel(product.condition)}
              </span>
            </div>

            {/* Product Title */}
            <h1
              style={{
                fontSize: '2.2rem',
                fontWeight: '800',
                color: '#ffffff',
                marginBottom: '8px',
                letterSpacing: '-0.5px',
                lineHeight: '1.2',
              }}
            >
              {product.title}
            </h1>

            {/* Price */}
            <div
              style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: 'var(--accent-lime)',
                marginBottom: '32px',
                letterSpacing: '-0.5px',
              }}
            >
              Ksh {product.price}
            </div>

            {/* Item Description Label */}
            <div
              style={{
                color: '#777777',
                fontSize: '0.78rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '12px',
              }}
            >
              ITEM DESCRIPTION
            </div>

            {/* Description Text */}
            <p
              style={{
                color: '#e2e8f0',
                fontSize: '1.05rem',
                lineHeight: '1.65',
                marginBottom: '32px',
              }}
            >
              {product.description || 'No description provided.'}
            </p>

            {/* Safe Trading Reminder Box */}
            <div
              style={{
                background: 'rgba(204, 255, 0, 0.03)',
                border: '1px solid rgba(204, 255, 0, 0.15)',
                borderRadius: '8px',
                padding: '18px 22px',
              }}
            >
              <div
                style={{
                  color: 'var(--accent-lime)',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  marginBottom: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>🛡️</span>
                <span>Safe Campus Trading Reminder</span>
              </div>
              <p
                style={{
                  color: '#8e8e8e',
                  fontSize: '0.88rem',
                  lineHeight: '1.55',
                  marginBottom: 0,
                }}
              >
                Always meet your fellow student in public campus areas (library entrance, cafeteria,
                or school gates). Inspect and test the item thoroughly before handing over cash or
                sending M-Pesa.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Right Column: Seller Information ─── */}
        <div className="col-lg-4">
          <div
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '32px',
            }}
          >
            {/* Header */}
            <h2
              style={{
                fontSize: '1.55rem',
                fontWeight: '800',
                color: '#ffffff',
                marginBottom: '14px',
                letterSpacing: '-0.3px',
              }}
            >
              Seller Information
            </h2>

            {/* Divider line under title matching screenshot */}
            <div
              style={{
                borderBottom: '1px solid var(--border-color)',
                marginBottom: '22px',
              }}
            ></div>

            {/* Student Username Label */}
            <div
              style={{
                color: '#777777',
                fontSize: '0.75rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '6px',
              }}
            >
              STUDENT USERNAME
            </div>

            {/* Student Username Value */}
            <div
              style={{
                color: '#ffffff',
                fontSize: '1.65rem',
                fontWeight: '800',
                marginBottom: '22px',
              }}
            >
              @{product.seller}
            </div>

            {/* Listed On Label */}
            <div
              style={{
                color: '#777777',
                fontSize: '0.75rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '6px',
              }}
            >
              LISTED ON
            </div>

            {/* Listed On Value */}
            <div
              style={{
                color: '#cccccc',
                fontSize: '1.15rem',
                fontWeight: '500',
                marginBottom: '28px',
              }}
            >
              {formatDate(product.created_at)}
            </div>

            {/* Email Seller Button */}
            <a
              href={mailtoHref}
              style={{
                display: 'block',
                width: '100%',
                backgroundColor: 'var(--accent-lime)',
                color: '#000000',
                fontWeight: '800',
                fontSize: '0.92rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textAlign: 'center',
                padding: '14px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background-color 0.2s ease, transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-lime-hover)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-lime)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              EMAIL SELLER ✉
            </a>

            {/* Verified Student Caption */}
            <p
              style={{
                color: '#777777',
                fontSize: '0.85rem',
                textAlign: 'center',
                marginTop: '16px',
                marginBottom: 0,
              }}
            >
              Verified student trading on CampusTrade
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
