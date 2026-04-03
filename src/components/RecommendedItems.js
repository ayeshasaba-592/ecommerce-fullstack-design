import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./RecommendedItems.css";
import { RECOMMENDED_PRODUCTS } from "../data/productData"; // Central data import

function RecommendedItems() {
  const navigate = useNavigate();

  return (
    <div className="rec-wrapper">
      <div className="rec-container">
        <h2 className="rec-title">Recommended items</h2>
        <div className="rec-grid">
          {RECOMMENDED_PRODUCTS.map((item) => (
            <div 
  key={item.id} 
  className="product-card" 
  onClick={() => navigate(`/products?search=${encodeURIComponent(item.name)}`)} 
  style={{ cursor: "pointer" }}
>
              <div className="img-holder">
                <img src={item.img} alt="product" />
              </div>
              <p className="rec-price">${item.price}</p>
              <p className="rec-desc">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecommendedItems;