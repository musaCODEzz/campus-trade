import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/api';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  // Exact categories matching your screenshot
  const categories = [
    { code: '', label: 'All Items' },
    { code: 'textbooks', label: '📚 Textbooks & Notes' },
    { code: 'electronics', label: '💻 Laptops & Electronics' },
    { code: 'hostel', label: '🛋️ Hostel & Furnishings' },
    { code: 'appliances', label: '🍳 Kitchen & Appliances' },
    { code: 'fashion', label: '👟 Fashion & Wearables' },
    { code: 'other', label: '📦 Other Items' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = { page };
        if (selectedCategory) params.category = selectedCategory;
        if (searchQuery) params.search = searchQuery;

        const data = await productService.getProducts(params);
        setProducts(data.results || []);
        setHasNext(!!data.next);
        setHasPrev(!!data.previous);
      } catch {
        setError('Failed to connect to the Django server. Make sure it is running on port 8000.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchQuery(searchInput);
  };

  const handleCategoryClick = (code) => {
    setPage(1);
    setSelectedCategory(code);
  };

  return (
    <div className="container py-5">
      {/* ─── Header & Search Bar Row ─── */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '800', letterSpacing: '-1px', marginBottom: '8px', color: '#ffffff' }}>
            Campus Marketplace<span style={{ color: 'var(--accent-lime)' }}>.</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: 0 }}>
            Buy and sell gear safely face-to-face on campus grounds.
          </p>
        </div>

        {/* Search Bar matching screenshot */}
        <form onSubmit={handleSearchSubmit} className="d-flex gap-2" style={{ maxWidth: '380px', width: '100%' }}>
          <input
            type="text"
            className="search-input-dark"
            placeholder="Search laptops, books, kettles..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn-search">
            SEARCH
          </button>
        </form>
      </div>

      {/* ─── Category Filter Pills matching screenshot ─── */}
      <div className="d-flex flex-wrap gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat.code}
            type="button"
            onClick={() => handleCategoryClick(cat.code)}
            className={`category-pill ${selectedCategory === cat.code ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ─── Error Alert ─── */}
      {error && (
        <div className="alert alert-danger bg-danger bg-opacity-10 border-danger text-danger my-4">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

      {/* ─── Loading or Products Grid ─── */}
      {loading ? (
        <div className="text-center py-5 my-5">
          <div className="spinner-border" style={{ color: 'var(--accent-lime)' }} role="status"></div>
          <p className="text-secondary small mt-3">Connecting to CampusTrade API...</p>
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="row g-4 mb-5">
            {products.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-lg-4">
                <ProductCard product={item} />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-center align-items-center gap-3 pt-3">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={!hasPrev}
              className="btn-outline-custom"
              style={{ opacity: hasPrev ? 1 : 0.4 }}
            >
              ← PREVIOUS
            </button>

            <span className="text-secondary small">Page {page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNext}
              className="btn-outline-custom"
              style={{ opacity: hasNext ? 1 : 0.4 }}
            >
              NEXT →
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-5 my-4 border border-secondary border-opacity-25 rounded-3 p-5">
          <div className="display-1 mb-3">📦</div>
          <h3 className="h4 text-white mb-2">No items found</h3>
          <p className="text-secondary mb-4">
            {searchQuery
              ? `No products matched your search "${searchQuery}". Try another keyword.`
              : 'There are no listings in this category yet.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('');
              setSearchQuery('');
              setSearchInput('');
              setPage(1);
            }}
            className="btn-lime"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
