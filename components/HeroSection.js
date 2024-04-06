import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="hero-container">
      {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
      <img
        src="images/Main-Hero-Background.webp"
        alt="Hero Section"
        className="hero-section-image"
      />
      <div className="hero-text">
        <h1>Ai Learnt</h1>
        <hr></hr>
        <p>Unlocking AI secrets for everyone!</p>
      </div>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          to="/"
        >
          Home
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          to="/products"
        >
          Ai Basics
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          to="/services"
        >
          Tools
        </Button>
      </div>
      {/* <div className='image-container'>
        <img src="/images/ai-basics.webp" alt="Image 1" className="image-container-img" />
        <img src="/images/tools.webp" alt="Image 2" className="image-container-img" />
        <img src="/images/tutorials.webp" alt="Image 3" className="image-container-img" />
        <img src="/images/community.webp" alt="Image 4" className="image-container-img" />
        <img src="/images/news.webp" alt="Image 5" className="image-container-img" />
      </div> */}
    </div>
  );
}

export default HeroSection;
