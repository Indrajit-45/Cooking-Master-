import React from 'react';
import "./HeroSection.css";
import bannerImg from "../assets/pexels-ella-olsson-572949-1640777.jpg"

const HeroSection = () => {
  return (
    <div className='HeroSection'>
       <img src="https://cookingmatters.org/wp-content/uploads/2023/06/hero.webp" alt="" />

       <div className='HeroSection-Banner top'>
          <h2>Recipes Right for Your Family</h2>
          <p>Have a picky eater? Short on time? Sort recipes by kid-friendly, prep time and more.</p>
       </div>
    </div>
  )
}

export default HeroSection