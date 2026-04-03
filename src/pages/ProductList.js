import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import axios from "axios"; 
import "./ProductList.css";

// Assets
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

function ProductList() {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const filterId = queryParams.get("id");
  const searchTerm = queryParams.get("search");

  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({
    category: "All",
    brands: [],
    features: [],
    condition: "Any",
    rating: 0,
    price: 2000
  });

  const [tempPrice, setTempPrice] = useState(2000);
  const [openSections, setOpenSections] = useState({ 
    cat: true, brand: true, feat: true, price: true, cond: true, rate: true 
  });
useEffect(() => {
  // If we came from the Hero page with a category in the state
  if (location.state && location.state.category) {
    const passedCat = location.state.category;
    
    // Update the filter state to match the clicked category
    setFilters(prev => ({
      ...prev,
      category: passedCat
    }));
    
  }
}, [location.state]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('https://my-ecommerce-backend-api.vercel.app/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleAddToCart = (e, item) => {
    e.stopPropagation(); 
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemExists = existingCart.find(cartItem => cartItem._id === item._id);
    
    let updatedCart;
    if (itemExists) {
      updatedCart = existingCart.map(cartItem =>
        cartItem._id === item._id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
      );
    } else {
      updatedCart = [...existingCart, { ...item, qty: 1, seller: item.brand || "Admin" }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  // FILTER LOGIC 
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (filterId) return p._id === filterId;

      // Check search match first
      let matchesSearch = true;
      if (searchTerm) {
        const s = searchTerm.toLowerCase();
        matchesSearch = p.name.toLowerCase().includes(s) || 
                        p.category.toLowerCase().includes(s);
      }

      // Sidebar filters
      const categoryMatch = filters.category === "All" || p.category === filters.category || p.cat === filters.category;
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(p.brand);
      const featureMatch = filters.features.length === 0 || filters.features.includes(p.feature);
      const conditionMatch = filters.condition === "Any" || p.condition === filters.condition;
      const ratingMatch = p.rating >= filters.rating || !p.rating;
      const priceMatch = p.price <= filters.price;

      return matchesSearch && categoryMatch && brandMatch && featureMatch && conditionMatch && ratingMatch && priceMatch;
    });
  }, [filters, filterId, searchTerm, products]);

  const toggleMultiFilter = (key, value) => {
    const currentItems = [...filters[key]];
    const index = currentItems.indexOf(value);
    if (index === -1) {
      currentItems.push(value);
    } else {
      currentItems.splice(index, 1);
    }
    setFilters({ ...filters, [key]: currentItems });
  };

  const updateFilter = (key, value) => setFilters({ ...filters, [key]: value });
  
  const handleApplyPrice = () => setFilters({ ...filters, price: tempPrice });

  const clearAllFilters = () => {
    setFilters({ category: "All", brands: [], features: [], condition: "Any", rating: 0, price: 2000 });
    setTempPrice(2000);
    navigate("/products"); 
  };

  const toggleSection = (sect) => setOpenSections({ ...openSections, [sect]: !openSections[sect] });

  if (loading) return <div className="pl-container"><h2>Loading items from Database...</h2></div>;

  return (
    <div className="pl-wrapper">
      <div className="pl-container">
        <div className="breadcrumbs">
          <span className="home-link" onClick={() => navigate("/")}>Home</span> &gt; Items &gt; <span>{filters.category}</span>
        </div>

        <div className="pl-main-layout">
          <aside className="pl-sidebar">
            <div className="filter-group">
              <h4 onClick={() => toggleSection('cat')}>Category <span className={`sidebar-arrow ${openSections.cat ? "open" : ""}`}></span></h4>
              {openSections.cat && (
                <ul>
                  <li onClick={() => updateFilter("category", "All")} className={filters.category === "All" ? "active" : ""}>See all</li>
                  <li onClick={() => updateFilter("category", "Mobile accessory")} className={filters.category === "Mobile accessory" ? "active" : ""}>Mobile accessory</li>
                  <li onClick={() => updateFilter("category", "Electronics")} className={filters.category === "Electronics" ? "active" : ""}>Electronics</li>
                  <li onClick={() => updateFilter("category", "Smartphones")} className={filters.category === "Smartphones" ? "active" : ""}>Smartphones</li>
                  <li onClick={() => updateFilter("category", "Modern tech")} className={filters.category === "Modern tech" ? "active" : ""}>Modern tech</li>
                  <li onClick={() => updateFilter("category", "Clothing")} className={filters.category === "Clothing" ? "active" : ""}>Clothing</li>
                </ul>
              )}
            </div>

            <div className="filter-group">
              <h4 onClick={() => toggleSection('brand')}>Brands <span className={`sidebar-arrow ${openSections.brand ? "open" : ""}`}></span></h4>
              {openSections.brand && (
                <div className="checkbox-list">
                  {["Samsung", "Apple", "Pocco", "Lenovo"].map(b => (
                    <label key={b}>
                      <input type="checkbox" onChange={() => toggleMultiFilter("brands", b)} checked={filters.brands.includes(b)} /> {b}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-group">
              <h4 onClick={() => toggleSection('feat')}>Features <span className={`sidebar-arrow ${openSections.feat ? "open" : ""}`}></span></h4>
              {openSections.feat && (
                <div className="checkbox-list">
                  {["Metallic", "Plastic cover", "8GB Ram", "Super power"].map(f => (
                    <label key={f}>
                      <input type="checkbox" onChange={() => toggleMultiFilter("features", f)} checked={filters.features.includes(f)} /> {f}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-group">
              <h4 onClick={() => toggleSection('price')}>Price range <span className={`sidebar-arrow ${openSections.price ? "open" : ""}`}></span></h4>
              {openSections.price && (
                <div className="price-box">
                  <input type="range" min="0" max="2000" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} className="slider" />
                  <div className="price-inputs">
                    <div><label>Min</label><input type="number" placeholder="0" readOnly /></div>
                    <div><label>Max</label><input type="number" value={tempPrice} readOnly /></div>
                  </div>
                  <button className="apply-btn" onClick={handleApplyPrice}>Apply</button>
                </div>
              )}
            </div>

            <div className="filter-group">
              <h4 onClick={() => toggleSection('cond')}>Condition <span className={`sidebar-arrow ${openSections.cond ? "open" : ""}`}></span></h4>
              {openSections.cond && (
                <div className="radio-list">
                  {["Any", "Refurbished", "Brand new", "Old items"].map(c => (
                    <label key={c}>
                      <input type="radio" name="condition" checked={filters.condition === c} onChange={() => updateFilter("condition", c)} /> {c}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-group">
              <h4 onClick={() => toggleSection('rate')}>Ratings <span className={`sidebar-arrow ${openSections.rate ? "open" : ""}`}></span></h4>
              {openSections.rate && (
                <div className="checkbox-list">
                  {[5, 4, 3, 2].map(num => (
                    <label key={num} onClick={() => updateFilter("rating", filters.rating === num ? 0 : num)} style={{cursor: 'pointer'}}>
                      <input type="checkbox" checked={filters.rating === num} readOnly />
                      <span className="stars-sidebar">{"★".repeat(num)}{"☆".repeat(5-num)}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </aside>

          <main className="pl-content">
            <div className="active-filters-chips">
              {filters.brands.map(brand => (
                <div key={brand} className="filter-chip">{brand} <span onClick={() => toggleMultiFilter("brands", brand)}>✕</span></div>
              ))}
              {filters.features.map(feat => (
                <div key={feat} className="filter-chip">{feat} <span onClick={() => toggleMultiFilter("features", feat)}>✕</span></div>
              ))}
              {filters.condition !== "Any" && (
                <div className="filter-chip">{filters.condition} <span onClick={() => updateFilter("condition", "Any")}>✕</span></div>
              )}
              {filters.rating !== 0 && (
                <div className="filter-chip">{filters.rating} Stars <span onClick={() => updateFilter("rating", 0)}>✕</span></div>
              )}
              {(filterId || searchTerm) && (
                <div className="filter-chip">Search Result <span onClick={clearAllFilters}>✕</span></div>
              )}
              {(filters.brands.length > 0 || filters.features.length > 0 || filters.condition !== "Any" || filters.rating !== 0 || filterId || searchTerm) && (
                <button className="clear-filters-btn" onClick={clearAllFilters}>Clear all filter</button>
              )}
            </div>

            <header className="pl-header-bar">
              <div className="header-left">{filteredProducts.length} items found</div>
              <div className="header-right">
                <div className="sort-container">
                  <span className="sort-label">Sort by: </span>
                  <select className="sort-select"><option>Featured</option></select>
                </div>
                <div className="view-toggle">
                  <button onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "active" : ""}>⊞</button>
                  <button onClick={() => setViewMode("list")} className={viewMode === "list" ? "active" : ""}>≡</button>
                </div>
              </div>
            </header>

            <div className={`product-display ${viewMode}`}>
              {filteredProducts.map(item => (
                <div key={item._id} className="product-card" onClick={() => navigate(`/product/${item._id}`, { state: { product: item } })}>
                  <div className="img-box">
                    <img src={IMGS[item.image] || item.image || item.img || phoneImg} alt={item.name} />
                  </div>
                  <div className="details-box">
                    <div className="top-row">
                      <h3>{item.name}</h3>
                      <div className="action-btns-list">
                        <button className="heart-btn">♡</button>
                        <button className="heart-btn" onClick={(e) => handleAddToCart(e, item)}>
                          <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                      </div>
                    </div>
                    <div className="price-row">
                      <span className="price">${Number(item.price).toFixed(2)}</span>
                      {item.oldPrice && <span className="old-price">${Number(item.oldPrice).toFixed(2)}</span>}
                    </div>
                    <div className="rating-row">
                      <span className="stars">{"★".repeat(Math.floor(item.rating || 5))}{"☆".repeat(5-Math.floor(item.rating || 5))}</span>
                      <span className="rate-num">{item.rating || 5}</span>
                      <span className="orders">{item.orders || 0} orders</span>
                      <span className="shipping">Free Shipping</span>
                    </div>
                    {viewMode === "list" && (
                        <p className="description">{item.description || "High quality performance product."}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductList;