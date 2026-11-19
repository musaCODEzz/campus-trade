import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService, authService } from '../services/api';

export default function AddProduct() {
  const navigate = useNavigate();

  // Route Guard: Redirect to login if user is not authenticated
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  // Controlled component states matching Django Product model
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('textbooks');
  const [condition, setCondition] = useState('like_new');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // UI status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (parseFloat(price) <= 0 || isNaN(parseFloat(price))) {
      setError('Please enter a valid price in Ksh.');
      return;
    }

    setLoading(true);

    try {
      // Send POST request with product payload
      // (JWT token is automatically attached by our Axios interceptor in api.js)
      const newProduct = await productService.createProduct({
        title,
        category,
        condition,
        price: parseFloat(price),
        description,
      });

      // Redirect student to the newly created product detail page!
      navigate(`/products/${newProduct.id}`);
    } catch (err) {
      if (err.response && err.response.data) {
        // Show validation errors from Django
        const firstErrorKey = Object.keys(err.response.data)[0];
        const errorMsg = err.response.data[firstErrorKey];
        setError(`${firstErrorKey.toUpperCase()}: ${Array.isArray(errorMsg) ? errorMsg[0] : errorMsg}`);
      } else {
        setError('Failed to post listing. Please ensure Django is running on port 8000.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="auth-container" style={{ maxWidth: '640px' }}>
        {/* Header */}
        <div className="text-center mb-4">
          <h1 style={{ fontSize: '1.9rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px' }}>
            Post a Listing<span style={{ color: 'var(--accent-lime)' }}>.</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>
            Pass on books, electronics, and room gear to verified peers on campus.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            className="alert alert-danger py-2 px-3 mb-4"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.88rem',
              borderRadius: '6px',
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label-dark">Item Title</label>
            <input
              type="text"
              required
              className="form-control-dark"
              placeholder="e.g. Introduction to Algorithms (CLRS) - 3rd Edition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category & Condition Row */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label-dark">Category</label>
              <select
                className="form-control-dark"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ cursor: 'pointer' }}
              >
                <option value="textbooks">📚 Textbooks &amp; Notes</option>
                <option value="electronics">💻 Laptops &amp; Electronics</option>
                <option value="hostel">🛋️ Hostel &amp; Furnishings</option>
                <option value="appliances">🍳 Kitchen &amp; Appliances</option>
                <option value="fashion">👟 Fashion &amp; Wearables</option>
                <option value="other">📦 Other Items</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label-dark">Condition</label>
              <select
                className="form-control-dark"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                style={{ cursor: 'pointer' }}
              >
                <option value="brand_new">Brand New</option>
                <option value="like_new">Like New / Barely Used</option>
                <option value="fair">Good / Fair Condition</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="mb-3">
            <label className="form-label-dark">Price (Ksh)</label>
            <input
              type="number"
              required
              step="50"
              min="0"
              className="form-control-dark"
              placeholder="e.g. 2500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="form-label-dark">Description</label>
            <textarea
              required
              rows={4}
              className="form-control-dark"
              placeholder="Provide details about condition, included accessories, campus pickup location..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-lime w-100 justify-content-center py-3"
            style={{ fontSize: '0.92rem', letterSpacing: '1px' }}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {loading ? 'PUBLISHING LISTING...' : 'PUBLISH ITEM TO MARKETPLACE →'}
          </button>
        </form>
      </div>
    </div>
  );
}