import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './Login.css';

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleAuth = async (e) => {
    e.preventDefault();
    
    // 1. Force the URL to be absolute to avoid any relative path confusion
    const baseUrl = "http://localhost:5000/api/users";
    const endpoint = isRegistering ? 'register' : 'login';
    const finalUrl = `${baseUrl}/${endpoint}`;

    console.log("🚀 Attempting request to:", finalUrl);
    console.log("📦 Data being sent:", formData);

    try {
     const response = await axios.post(
  `http://localhost:5000/api/users/${isRegistering ? 'register' : 'login'}`, 
  formData
);
      
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        alert(isRegistering ? "Registered successfully! Please login now." : "Login successful!");
        
        if(isRegistering) {
            setIsRegistering(false); 
        } else {
            if (response.data.isAdmin) {
              navigate("/admin");
            } else {
              navigate("/");
            }
            window.location.reload(); 
        }
      }
    } catch (err) {
      console.error("❌ Full Error Object:", err);
      // This will tell us if it's a 404, 500, or Network Error
      const errorMessage = err.response?.data?.message || "Server is not responding. Check your Backend terminal.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h3 className="login-title">
          {isRegistering ? "Create Account" : "Sign In"}
        </h3>
        
        <div className="social-logins">
          <button className="social-btn google">Continue with Google</button>
          <button className="social-btn facebook">Continue with Facebook</button>
          <button className="social-btn twitter">Continue with Twitter</button>
        </div>

        <div className="separator"><span>OR</span></div>

        <form className="login-form" onSubmit={handleAuth}>
          {isRegistering && (
            <div className="input-group">
              <label>Full Name</label>
              <input 
                name="name" 
                type="text" 
                placeholder="e.g. John Doe" 
                onChange={handleInputChange} 
                required 
              />
            </div>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="At least 6 characters" 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <button type="submit" className="main-login-btn">
            {isRegistering ? "Register Now" : "Log In"}
          </button>
        </form>

        <p className="toggle-text">
          {isRegistering ? "Already have an account?" : "Don't have an account?"} 
          <span className="blue-link" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? " Login here" : " Register now"}
          </span>
        </p>

        {isRegistering && (
          <p className="terms">
            By creating an account, you agree to our Terms & Conditions.
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;