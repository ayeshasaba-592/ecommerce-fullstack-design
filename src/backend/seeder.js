const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// --- 1. SCHEMAS ---
const orderSchema = new mongoose.Schema({
  items: Array,
  totalAmount: Number,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const Product = require('./models/Product');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }
});

// --- 2. MODELS ---
const Order = mongoose.model('Order', orderSchema);
const User = mongoose.model('User', userSchema);

// --- 3. DATA ARRAY ---
const products = [
  { name: "iPhone 12 Pro Max 128GB Red", price: 999.50, oldPrice: 1100.00, image: "smartphone", description: "Metallic finish, brand new condition with high-speed performance.", category: "Smartphones", stock: 10, brand: "Apple", rating: 4, orders: 154, condition: "Brand new", feature: "Metallic" },
  { name: "Canon Camera EOS 2000, Black 10x zoom", price: 998.00, image: "camera", description: "Refurbished professional camera for high-quality photography.", category: "Electronics", stock: 5, brand: "Canon", rating: 4, orders: 154, condition: "Refurbished", feature: "Plastic cover" },
  { name: "Xiaomi Pad 6 Pro 256GB Tablet", price: 450.00, image: "tablet", description: "8GB Ram, high performance tablet for work and play.", category: "Modern tech", stock: 12, brand: "Pocco", rating: 3, orders: 88, condition: "Brand new", feature: "8GB Ram" },
  { name: "Macbook Pro M2 - Space Gray", price: 1299.00, image: "laptop", description: "Super power M2 chip with stunning retina display.", category: "Modern tech", stock: 8, brand: "Apple", rating: 5, orders: 45, condition: "Brand new", feature: "Super power" },
  { name: "Smart Watch Series 9 Waterproof", price: 199.00, image: "watch", description: "Metallic waterproof smartwatch with health tracking.", category: "Modern tech", stock: 25, brand: "Samsung", rating: 4, orders: 320, condition: "Refurbished", feature: "Metallic" },
  { name: "Gaming Headset RGB High Bass", price: 55.00, image: "headset", description: "RGB lighting with high bass for immersive gaming.", category: "Mobile accessory", stock: 100, brand: "Lenovo", rating: 5, orders: 1200, condition: "Brand new", feature: "Plastic cover" },
  { name: "Wireless Noise Cancelling Headphones", price: 120.00, image: "headphone", description: "Premium sound quality with active noise cancellation.", category: "Mobile accessory", stock: 40, brand: "Samsung", rating: 4, orders: 650, condition: "Refurbished", feature: "Plastic cover" },
  { name: "Electric Stainless Steel Kettle", price: 45.00, image: "kettle", description: "Durable metallic kettle with fast-boil technology.", category: "Electronics", stock: 30, brand: "Lenovo", rating: 3, orders: 430, condition: "Old items", feature: "Metallic" },
  { name: "High Speed Kitchen Blender", price: 85.00, image: "blender", description: "Powerful kitchen mixer for smoothies and cooking.", category: "Electronics", stock: 15, brand: "Pocco", rating: 2, orders: 210, condition: "Brand new", feature: "Plastic cover" },
  { name: "Automatic Espresso Coffee Machine", price: 299.00, image: "coffee", description: "Metallic professional espresso maker for home baristas.", category: "Electronics", stock: 10, brand: "Samsung", rating: 5, orders: 95, condition: "Refurbished", feature: "Metallic" },
  { name: "Men's Shirt", price: 120.00, image: "shirt", description: "Classic formal shirt for professional attire.", category: "Clothing", stock: 60, brand: "Samsung", rating: 4.5, orders: 154, condition: "Brand new", feature: "Cotton" },
  { name: "Brown Jacket", price: 850.00, image: "jacket", description: "Premium leather jacket for all seasons.", category: "Clothing", stock: 20, brand: "Apple", rating: 4.8, orders: 89, condition: "Brand new", feature: "Leather" },
  { name: "Blue Men's Suit", price: 299.00, image: "suit", description: "Elegant blue suit for special occasions.", category: "Clothing", stock: 15, brand: "Canon", rating: 4.2, orders: 12, condition: "Brand new", feature: "Slim Fit" },
  { name: "Blue Leather Wallet", price: 150.00, image: "wallet", description: "Genuine blue leather wallet with multiple card slots.", category: "Clothing", stock: 45, brand: "Samsung", rating: 4.7, orders: 500, condition: "Brand new", feature: "Genuine Leather" },
  { name: "Travel Bag", price: 540.00, image: "bag", description: "Large capacity travel bag for your next adventure.", category: "Clothing", stock: 25, brand: "Canon", rating: 4.0, orders: 30, condition: "Brand new", feature: "Waterproof" },
  { name: "Cooking Pot", category: "Home", price: 19, image: "pot", brand: "ChefPro", rating: 5 },
  { name: "Kitchen Mixer", category: "Home", price: 100, image: "blender", brand: "MixMaster", rating: 4 },
  { name: "Coffee Maker Machine", category: "Home", price: 39, image: "coffee", brand: "Brew", rating: 5 },
  { name: "Smart Watch", category: "Electronics", price: 19, image: "watch", brand: "Apple", rating: 5 },
  { name: "GoPro Camera", category: "Electronics", price: 89, image: "camera", brand: "GoPro", rating: 4 },
  { name: "Headphones", category: "Electronics", price: 10, image: "headphone", brand: "Sony", rating: 5 },
  { name: "Gaming Tablet", category: "Electronics", price: 90, image: "tablet", brand: "Samsung", rating: 4 },
  { name: "Gaming Set", category: "Electronics", price: 35, image: "headset", brand: "Logitech", rating: 5 },
  { name: "Macbook Laptop", category: "Electronics", price: 340, image: "laptop", brand: "Apple", rating: 5 },
  { name: "Smartphone", category: "Electronics", price: 19, image: "smartphone", brand: "Samsung", rating: 4 },
  { name: "Electric Kettle", category: "Electronics", price: 240, image: "kettle", brand: "LG", rating: 5 },
];

const runSeeder = async () => {
  try {
    console.log("⏳ Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");

    console.log("🗑️  Cleaning old data...");
    await Product.deleteMany(); 
    
    console.log("📥 Inserting new products...");
    await Product.insertMany(products);
    
    console.log("✨ Data Imported Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

runSeeder();