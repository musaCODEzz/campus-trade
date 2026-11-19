import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import { authService } from './services/api';

function App() {
  const [user, setUser] = useState(() => authService.getCurrentUser());

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar user={user} setUser={setUser} />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
