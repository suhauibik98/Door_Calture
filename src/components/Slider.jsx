/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
 import "./Slider.css"
import { useNavigate } from "react-router-dom";
const Slider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    const timeout = setTimeout(() => {
      setShowButton(true);
    }, 13000);
    return () => {
      clearInterval(interval);
      clearInterval(timeout);
    };
  }, [images]);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ alignItems: "center" }}>
        أشكال أبواب تراثية
        </h2>
      </div>
      <div className="image-slider-container">
        
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          className="slider-image"
        />
        {/* Add a class for styling */}
      </div>
      {showButton && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => navigate("/Drag&Drop")}
            style={{ alignItems: "center" }}
          >
            التالي
          </button>{" "}
        </div>
      )}
    </>
  );
};
export default Slider;
