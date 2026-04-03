import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom"; 
import axios from "axios"; 
import "./ProductDetail.css";

// --- IMAGE MAPPING ---
import relatedImg1 from "../assets/kettle.png"; 
import phoneImg from "../assets/smartphone.png";
import watchImg from "../assets/watch.png";
import tabletImg from "../assets/tablet.png";
import headphoneImg from "../assets/headset.png";
import laptop from "../assets/laptop.png";
import cameraImg from "../assets/gopro.png";
import shirtImg from "../assets/shirt.png";
import jacketImg from "../assets/jacket.png";
import walletImg from "../assets/wallet.png";

const IMGS = {
  smartphone: phoneImg,
  tablet: tabletImg,
  laptop: laptop,
  watch: watchImg,
  camera: cameraImg,
  kettle: relatedImg1,
  shirt: shirtImg,
  jacket: jacketImg,
  wallet: walletImg,
  headphone: headphoneImg,
};

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const [isSaved, setIsSaved] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  
  const { id } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();

  // --- DATABASE STATE ---
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Try to get product from navigation state first (faster)
        if (location.state?.product) {
          setProduct(location.state.product);
          setLoading(false);
        } else {
          // ✅ UPDATED: Fetching from your Live Vercel Backend
          const res = await axios.get(`https://my-ecommerce-backend-api.vercel.app/api/products/${id}`);
          setProduct(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id, location.state]);

  // --- ADD TO CART LOGIC ---
  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemExists = existingCart.find(cartItem => cartItem._id === item._id);
    
    let updatedCart;
    if (itemExists) {
      updatedCart = existingCart.map(cartItem =>
        cartItem._id === item._id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
      );
    } else {
      updatedCart = [...existingCart, { ...item, qty: 1, seller: item.brand || "Guanjoi Trading LLC" }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const handleProductClick = (newProduct) => {
    // Navigation for related items
    navigate(`/product/${newProduct._id || newProduct.id}`, { state: { product: newProduct } });
  };

  if (loading) return <div className="pd-container"><h2>Loading Product...</h2></div>;
  if (!product) {
    return <div className="pd-container"><h2>Product not found. <Link to="/">Go Home</Link></h2></div>;
  }

  // Determine which image to show (Local lookup vs URL)
  const displayImage = IMGS[product.image] || product.img || product.image || phoneImg;

  const relatedProducts = [
    { id: 101, name: "Xiaomi Redmi 8 Original", price: "32", img: phoneImg },
    { id: 102, name: "Xiaomi Mi 11 Ultra Pro", price: "850", img: laptop },
    { id: 103, name: "Apple iPhone 13 Case", price: "15", img: relatedImg1 },
    { id: 104, name: "Samsung Galaxy Tab S7", price: "540", img: tabletImg },
    { id: 105, name: "Modern Electric Kettle 1.5L", price: "45", img: relatedImg1 },
    { id: 106, name: "High-End Smart Watch", price: "199", img: watchImg },
  ];

  const youMayLike = [
    { id: 201, name: "Electric Kettle useful for Homes ", price: "78", img: relatedImg1 },
    { id: 202, name: "Wireless Noise Headphones", price: "120", img: headphoneImg },
    { id: 203, name: "Apple MacBook Pro M1", price: "1299", img: tabletImg },
    { id: 204, name: "Leather Smart Watch Band", price: "25", img: watchImg },
    { id: 205, name: "Original 20W USB-C Adapter", price: "19", img: phoneImg },
  ];

  return (
    <div className="pd-wrapper">
      <div className="pd-container">
        
    <nav className="pd-breadcrumbs">
     <Link to="/">Home</Link> 
     {" > "} 
    <Link to="/products">Products</Link> 
     {" > "} 
     <span>{product.name}</span>
     </nav>

        <div className="pd-main-card">
          <div className="pd-gallery">
            <div className="pd-main-img-box">
              <img src={displayImage} alt={product.name} />
            </div>
            <div className="pd-thumb-list">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="pd-thumb">
                  <img src={displayImage} alt="thumb" />
                </div>
              ))}
            </div>
          </div>

          <div className="pd-info">
            <span className="pd-status">✓ In stock</span>
            <h1 className="pd-title">{product.name}</h1>
            
            <div className="pd-stats-row">
              <div className="pd-rating">
                <span className="stars">{"★".repeat(Math.floor(product.rating || 4))}{"☆".repeat(5-Math.floor(product.rating || 4))}</span>
                <span className="score">{product.rating || "9.3"}</span>
              </div>
              <span className="dot"></span>
              <span className="stat-text">{product.reviews || "32"} reviews</span>
              <span className="dot"></span>
              <span className="stat-text">{product.sold || "154"} sold</span>
            </div>

            <div className="pd-price-tiers">
              <div className="price-tier highlight">
                <span className="tier-price">${product.price}.00</span>
                <span className="tier-qty">50-100 pcs</span>
              </div>
              <div className="price-tier">
                <span className="tier-price">$90.00</span>
                <span className="tier-qty">100-700 pcs</span>
              </div>
              <div className="price-tier">
                <span className="tier-price">$78.00</span>
                <span className="tier-qty">700+ pcs</span>
              </div>
            </div>

            <table className="pd-details-table">
              <tbody>
                <tr><td>Price:</td><td>Negotiable</td></tr>
                <tr><td>Type:</td><td>Classic Edition</td></tr>
                <tr><td>Material:</td><td>{product.feature || "Plastic material"}</td></tr>
                <tr><td>Design:</td><td>Modern nice</td></tr>
              </tbody>
            </table>
            <hr className="pd-divider" />
            <table className="pd-details-table">
              <tbody>
                <tr><td>Customization:</td><td>Customized logo and design</td></tr>
                <tr><td>Protection:</td><td>Refund Policy</td></tr>
                <tr><td>Warranty:</td><td>2 years full warranty</td></tr>
              </tbody>
            </table>
          </div>

          <aside className="pd-supplier-panel">
            <div className="supplier-brand">
              <div className="brand-letter">{product.brand ? product.brand[0] : "R"}</div>
              <div className="brand-info">
                <p>Supplier</p>
                <p className="brand-name">{product.brand || "Guanjoi Trading LLC"}</p>
              </div>
            </div>
            <hr />
            <div className="supplier-loc">
              <p>🇩🇪 Germany, Berlin</p>
              <p>🛡 Verified Seller</p>
              <p>🌐 Worldwide shipping</p>
            </div>
            <button className="btn-inquiry" style={{background: '#FF9017', marginBottom: '-7px'}} onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button className="btn-inquiry" onClick={() => setShowInquiry(true)}>Send inquiry</button>
            <button className="btn-profile">Seller's profile</button>
            <button className={`btn-save ${isSaved ? "saved" : ""}`} onClick={() => setIsSaved(!isSaved)}>
              <i className={isSaved ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i> 
              {isSaved ? " Saved" : " Save for later"}
            </button>
          </aside>
        </div>

        <div className="pd-bottom-grid">
          <div className="pd-tabs-container">
            <div className="pd-tabs-header">
              {["Description", "Reviews", "Shipping", "About seller"].map(t => (
                <button key={t} className={activeTab === t ? "active" : ""} onClick={() => setActiveTab(t)}>{t}</button>
              ))}
            </div>
            <div className="pd-tabs-content">
              <p>{product.description || "Detailed specifications for your selected product. This model provides superior performance and elegant design suited for professional use."}</p>
              
              <table className="content-spec-table">
                <tbody>
                  <tr><td>Model</td><td>#M123-2026</td></tr>
                  <tr><td>Style</td><td>{product.condition || "Classic style"}</td></tr>
                  <tr><td>Certificate</td><td>ISO-898921212</td></tr>
                  <tr><td>Size</td><td>34 x 24 x 19 cm</td></tr>
                  <tr><td>Category</td><td>{product.category}</td></tr>
                </tbody>
              </table>

              <ul className="pd-feature-list">
                <li><i className="fa-solid fa-check"></i> High-quality build material</li>
                <li><i className="fa-solid fa-check"></i> Water resistant design</li>
                <li><i className="fa-solid fa-check"></i> Ergonomic grip and lightweight</li>
              </ul>
            </div>
          </div>

          <aside className="pd-you-may-like">
            <h3>You may like</h3>
            {youMayLike.map((item) => (
              <div key={item.id} className="like-item" onClick={() => handleProductClick(item)}>
                <div className="like-img"><img src={item.img} alt="item" /></div>
                <div className="like-info">
                  <p>{item.name}</p>
                  <span>${item.price}.00</span>
                </div>
              </div>
            ))}
          </aside>
        </div>

        <div className="pd-related-section">
          <h3>Related products</h3>
          <div className="related-grid">
            {relatedProducts.map((item) => (
              <div key={item.id} className="related-card" onClick={() => handleProductClick(item)}>
                <div className="related-img-box"><img src={item.img} alt="" /></div>
                <p className="related-name">{item.name}</p>
                <p className="related-price">${item.price}.00 - ${parseInt(item.price)+20}.00</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pd-discount-banner">
          <div className="banner-content">
            <h2>Super discount on more than 100 USD</h2>
            <p>Have you ever finally just write dummy info</p>
          </div>
          <button className="btn-shop-now">Shop now</button>
        </div>

      </div>

      {showInquiry && (
        <div className="modal-overlay">
          <div className="inquiry-modal">
            <h3>Send Inquiry to Supplier</h3>
            <textarea placeholder="Write your message here..."></textarea>
            <div className="modal-btns">
              <button onClick={() => setShowInquiry(false)}>Cancel</button>
              <button className="btn-send" onClick={() => {alert("Inquiry Sent!"); setShowInquiry(false);}}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;