import React from "react";
import "./ExtraServices.css";

import hubBg from "../assets/hub-bg.png";
import customBg from "../assets/custom-bg.png";
import shippingBg from "../assets/shipping-bg.png";
import monitoringBg from "../assets/monitoring-bg.png";

function ExtraServices() {
  const services = [
    { title: "Source from Industry Hubs", img: hubBg, iconClass: "icon-search" },
    { title: "Customize Your Products", img: customBg, iconClass: "icon-inventory" },
    { title: "Fast, reliable shipping by ocean or air", img: shippingBg, iconClass: "icon-send" },
    { title: "Product monitoring and inspection", img: monitoringBg, iconClass: "icon-shield" },
  ];

  return (
    <div className="services-wrapper">
      <div className="services-container">
        <h2 className="services-title">Our extra services</h2>
        <div className="services-flex">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-img-container">
                <img src={service.img} alt="" className="service-main-img" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <div className="service-icon-circle">
                  <div className={`css-icon ${service.iconClass}`}></div>
                </div>
                <p className="service-text">{service.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExtraServices;