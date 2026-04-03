const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// 1. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 2. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Connection Error:", err));

// 3. MODELS
const Product = require('./models/Product');
const User = require('./models/User');

// 4. AUTH ROUTES
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: email === "admin@example.com"
    });

    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin }, 
        process.env.JWT_SECRET, 
        { expiresIn: '30d' }
      );
      res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: err.message });
  }
});
// Middleware to verify if user is an Admin
const protectAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.isAdmin) {
        next(); // User is Admin, allow them through
      } else {
        res.status(403).json({ message: "Forbidden: Admins only" });
      }
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

// 5. PRODUCT ROUTES
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ADD a new product
app.post('/api/products', protectAdmin, async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// EDIT/UPDATE a product
app.put('/api/products/:id', protectAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a product
app.delete('/api/products/:id', protectAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post('/api/orders', async (req, res) => {
  try {
    console.log("New Order Received:", req.body);
    
   
    res.status(201).json({ message: "Order saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
module.exports = app;