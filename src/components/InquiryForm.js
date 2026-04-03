import React, { useState } from "react";
import "./InquiryForm.css"; 
import Inquirybg from "../assets/Inquirybg.png"; 

function InquiryForm() {
  const [formData, setFormData] = useState({
    item: "",
    details: "",
    quantity: "",
    unit: "Pcs"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry submitted:", formData);
    alert("Inquiry Sent!");
  };

  return (
    <div className="inquiry-wrapper">
      <div className="inquiry-container">
        
        {/* Background Section */}
        <div className="bg-overlay">
          <img src={Inquirybg} alt="Background" className="bg-img" />
          <div className="blue-gradient"></div>
        </div>

        {/* Left Side: Text */}
        <div className="text-content">
          <h2>An easy way to send <br/> requests to all suppliers</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing <br/> 
            elit, sed do eiusmod tempor incididunt.
          </p>
        </div>

        {/* Right Side: Form */}
        <form className="form-card" onSubmit={handleSubmit}>
          <h3>Send quote to suppliers</h3>
          
          <input 
            className="form-input"
            name="item"
            type="text" 
            placeholder="What item you need?" 
            onChange={handleChange}
            required
          />

          <textarea 
            className="form-textarea"
            name="details"
            placeholder="Type more details" 
            onChange={handleChange}
          ></textarea>

          <div className="form-row">
            <input 
              className="form-input"
              name="quantity"
              type="text" 
              placeholder="Quantity" 
              onChange={handleChange}
            />
            <select name="unit" className="form-input" style={{width: '100px'}} onChange={handleChange}>
              <option>Pcs</option>
              <option>Kg</option>
            </select>
          </div>

          <button type="submit" className="form-btn">
            Send inquiry
          </button>
        </form>

      </div>
    </div>
  );
}

export default InquiryForm;