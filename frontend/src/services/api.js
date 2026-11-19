import axios from 'axios';

// 1. The Central Base URL for our Django REST API
const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Automatically attaches the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor: If access token expired (401), try to refresh it
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          // Ask Django for a new access token using our refresh token
          const res = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          const newAccess = res.data.access;
          localStorage.setItem('access_token', newAccess);

          // Retry the original request that failed
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest);
        } catch {
          // If refresh token also expired, log out completely
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// ─── Authentication Service ───
export const authService = {
  // Login: receives tokens, saves them, and fetches user profile
  login: async (username, password) => {
    const res = await api.post('/auth/login/', { username, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);

    // Get current logged-in user profile
    const userRes = await api.get('/auth/user/');
    localStorage.setItem('user', JSON.stringify(userRes.data));
    return userRes.data;
  },

  // Register a new student account
  register: async (username, email, password) => {
    const res = await api.post('/auth/register/', { username, email, password });
    return res.data;
  },

  // Read current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Logout: wipes tokens
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },
};

// ─── Products Service ───
export const productService = {
  // GET /api/products/ (supports ?search= and ?category=)
  getProducts: async (params = {}) => {
    const res = await api.get('/products/', { params });
    return res.data;
  },

  // GET /api/products/:id/
  getProduct: async (id) => {
    const res = await api.get(`/products/${id}/`);
    return res.data;
  },

  // POST /api/products/
  createProduct: async (productData) => {
    const res = await api.post('/products/', productData);
    return res.data;
  },

  // PUT /api/products/:id/
  updateProduct: async (id, productData) => {
    const res = await api.put(`/products/${id}/`, productData);
    return res.data;
  },

  // DELETE /api/products/:id/
  deleteProduct: async (id) => {
    const res = await api.delete(`/products/${id}/`);
    return res.data;
  },
};

export default api;