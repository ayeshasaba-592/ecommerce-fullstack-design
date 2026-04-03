import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // 1. Import axios for database connection
import './Cart.css';

// --- IMPORT ASSETS (Same as ProductList/ProductDetail) ---
import phoneImg from "../assets/smartphone.png"; 
import tabletImg from "../assets/tablet.png";
import laptopImg from "../assets/laptop.png";
import watchImg from "../assets/watch.png";
import cameraImg from "../assets/gopro.png";
import headsetImg from "../assets/headphone.png";
import headphoneImg from "../assets/headset.png";
import kettleImg from "../assets/kettle.png";
import blenderImg from "../assets/kitchen-mixer.png";
import coffeeImg from "../assets/blender.png";
import shirtImg from "../assets/shirt.png";
import jacketImg from "../assets/jacket.png";
import suitImg from "../assets/suit.png";
import walletImg from "../assets/wallet.png";
import bagImg from "../assets/travel-bag.png";

// --- IMAGE MAPPING OBJECT ---
const IMGS = {
  smartphone: phoneImg,
  tablet: tabletImg,
  laptop: laptopImg,
  watch: watchImg,
  camera: cameraImg,
  headset: headsetImg,
  headphone: headphoneImg,
  kettle: kettleImg,
  blender: blenderImg,
  coffee: coffeeImg,
  shirt: shirtImg,
  jacket: jacketImg,
  suit: suitImg,
  wallet: walletImg,
  bag: bagImg,
};

const Cart = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [savedItems, setSavedItems] = useState(() => {
    const savedLater = localStorage.getItem("savedLater");
    return savedLater ? JSON.parse(savedLater) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("savedLater", JSON.stringify(savedItems));
  }, [savedItems]);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.qty), 0);
  const discount = subtotal > 100 ? 60 : 0; 
  const tax = subtotal > 0 ? 14 : 0;      
  const total = subtotal > 0 ? (subtotal - discount + tax) : 0;

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(cartItems.map(item => (item._id === id || item.id === id) ? { ...item, qty: newQty } : item));
  };

  const removeItem = (id) => setCartItems(cartItems.filter(item => (item._id !== id && item.id !== id)));

  const moveToSave = (item) => {
    removeItem(item._id || item.id);
    setSavedItems([...savedItems, item]);
  };

  const moveToCart = (item) => {
    setSavedItems(savedItems.filter(i => (i._id !== (item._id || item.id) && i.id !== (item._id || item.id))));
    setCartItems([...cartItems, { ...item, qty: 1 }]);
  };

  // --- DATABASE INTEGRATION FUNCTION ---
  const handleCheckout = async () => {
    // 1. Check if cart is empty
    if (cartItems.length === 0) return alert("Your cart is empty");

    // 2. THE GUARD: Check if user is logged in
    const userData = localStorage.getItem("user"); 
    if (!userData) {
      alert("Please login to complete your purchase!");
      return (window.location.href = "/login"); // Or use navigate("/login") if you import it
    }

    const user = JSON.parse(userData);

    try {
      // 3. Send order with User Info
      const response = await axios.post("http://localhost:5000/api/orders", {
        userId: user._id, // Adding the user ID to the order
        items: cartItems,
        totalAmount: total,
      });

      if (response.status === 201 || response.status === 200) {
        alert(`Order placed successfully for ${user.name}!`);
        setCartItems([]); 
        localStorage.removeItem("cart"); 
      }
    } catch (error) {
      console.error("Database connection error:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <h2>My cart ({cartItems.length})</h2>

        <div className="cart-grid">
          <div className="cart-main">
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div className="cart-item" key={item._id || item.id}>
                  <div className="item-details">
                    <img src={IMGS[item.image] || item.img || phoneImg} alt={item.name} />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Size: {item.size || 'medium'}, Color: {item.color || 'blue'}, Material: {item.material || 'Plastic'}</p>
                      <p className="seller-text">Seller: {item.seller || item.brand || "Admin"}</p>
                      <div className="item-actions">
                        <button onClick={() => removeItem(item._id || item.id)} className="btn-remove">Remove</button>
                        <button onClick={() => moveToSave(item)} className="btn-save-later">Save for later</button>
                      </div>
                    </div>
                  </div>

                  <div className="item-right">
                    <span className="item-price">${Number(item.price).toFixed(2)}</span>
                    <select value={item.qty} onChange={(e) => updateQty(item._id || item.id, parseInt(e.target.value))}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>Qty: {n}</option>)}
                    </select>
                  </div>
                </div>
              ))
            ) : (
              <div className="cart-empty-msg" style={{padding: '20px', textAlign: 'center'}}>
                <p>Your cart is empty.</p>
                <Link to="/" style={{color: '#0D6EFD', textDecoration: 'none'}}>Explore products</Link>
              </div>
            )}

            <div className="cart-footer-btns">
              <Link to="/" className="btn-back">← Back to shop</Link>
              <button className="btn-clear" onClick={() => setCartItems([])}>Remove all</button>
            </div>
            
            <div className="cart-features">
               <div className="feature"><i className="fas fa-lock"></i> <div><strong>Secure Payment</strong><p>Have you ever finally just</p></div></div>
               <div className="feature"><i className="fas fa-comment"></i> <div><strong>Customer Support</strong><p>Have you ever finally just</p></div></div>
               <div className="feature"><i className="fas fa-truck"></i> <div><strong>Free Delivery</strong><p>Have you ever finally just</p></div></div>
            </div>
          </div>

          <div className="cart-sidebar">
            <div className="coupon-box">
              <p>Have a coupon?</p>
              <div className="coupon-input">
                <input type="text" placeholder="Add coupon" />
                <button>Apply</button>
              </div>
            </div>

            <div className="summary-box">
              <div className="summary-row"><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></div>
              <div className="summary-row"><span>Discount:</span> <span className="text-red">-${discount.toFixed(2)}</span></div>
              <div className="summary-row"><span>Tax:</span> <span className="text-green">+${tax.toFixed(2)}</span></div>
              <hr style={{border: 'none', borderBottom: '1px solid #EEEEEE', margin: '15px 0'}} />
              <div className="summary-row total"><span>Total:</span> <span>${total.toFixed(2)}</span></div>
              {/* Added onClick to Checkout button */}
              <button className="btn-checkout" onClick={handleCheckout}>Checkout</button>
              
              <div className="payment-methods">
                <div style={{display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '15px', alignItems: 'center'}}>
                   <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" style={{height: '18px'}} alt="Paypal" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" style={{height: '18px'}} alt="Mastercard" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" style={{height: '18px'}} alt="Amex" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SAVED FOR LATER SECTION --- */}
        <div className="saved-for-later" style={{marginTop: '30px', background: '#fff', border: '1px solid #DEE2E7', borderRadius: '6px', padding: '20px'}}>
          <h3>Saved for later</h3>
          <div className="saved-grid">
            {savedItems.length > 0 ? (
              savedItems.map(item => (
                <div className="saved-card" key={item._id || item.id}>
                  <div className="saved-img-box">
                      <img src={IMGS[item.image] || item.img || phoneImg} alt={item.name} />
                  </div>
                  <div className="saved-info">
                    <h4 className="saved-price">${Number(item.price).toFixed(2)}</h4>
                    <p className="saved-name">{item.name}</p>
                    <button onClick={() => moveToCart(item)} className="btn-move-to-cart">
                      <i className="fas fa-shopping-cart" style={{marginRight: '8px'}}></i> Move to cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{color: '#8B96A5', fontSize: '14px'}}>No items saved for later.</p>
            )}
          </div>
        </div>

        <div className="pd-discount-banner cart-banner" style={{marginTop: '30px', padding: '30px', background: '#005ADE', borderRadius: '8px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div className="banner-content">
            <h2 style={{margin: 0, fontSize: '24px'}}>Super discount on more than 100 USD</h2>
            <p style={{margin: '5px 0 0 0', opacity: 0.8}}>Have you ever finally just write dummy info</p>
          </div>
          <button className="btn-shop-now" style={{background: '#FF9017', border: 'none', padding: '10px 20px', borderRadius: '6px', color: '#fff', fontWeight: 'bold', cursor: 'pointer'}}>Shop now</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;