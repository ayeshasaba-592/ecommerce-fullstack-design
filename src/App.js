import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail'; 
import Cart from './pages/Cart'; 
import Login from './pages/Login'; 
import AdminPanel from './pages/AdminPanel';
// Simple Admin Guard
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.isAdmin ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
        <AdminRoute>
        <AdminPanel />
        </AdminRoute>
} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;