import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
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
            <Route path="/products" element={<ProductList />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;