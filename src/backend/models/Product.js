const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  image: String,
  description: String,
  category: String,
  stock: Number,
  brand: String,
  rating: Number,
  orders: Number,
  condition: String,
  feature: String
});

module.exports = mongoose.model('Product', productSchema);