import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  // Exact category labels from your screenshot
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

  // Exact condition labels from your screenshot
  const getConditionLabel = (cond) => {
    const conditions = {
      brand_new: 'Brand New',
      like_new: 'Like New / Barely Used',
      fair: 'Good / Fair Condition',
    };
    return conditions[cond] || cond;
  };

  return (
    <div className="dark-card">
      <div>
        {/* Top Badges */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--accent-lime)',
              fontWeight: '700',
            }}
          >
            {getCategoryLabel(product.category)}
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              background: 'rgba(255,255,255,0.05)',
              padding: '3px 8px',
              borderRadius: '4px',
            }}
          >
            {getConditionLabel(product.condition)}
          </span>
        </div>

        {/* Product Title */}
        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>
          {product.title}
        </h3>

        {/* Description */}
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '16px', minHeight: '42px' }}>
          {product.description?.length > 85
            ? product.description.substring(0, 85) + '...'
            : product.description || 'No description provided.'}
        </p>
      </div>

      {/* Card Footer: Divider line + Price/Seller + VIEW ITEM Button */}
      <div
        className="d-flex justify-content-between align-items-center pt-3"
        style={{ borderTop: '1px solid var(--border-color)' }}
      >
        <div>
          <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--accent-lime)' }}>
            Ksh {product.price}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Seller: {product.seller}
          </div>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="btn-outline-custom"
          style={{ padding: '8px 16px', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}
        >
          VIEW ITEM &rarr;
        </Link>
      </div>
    </div>
  );
}
