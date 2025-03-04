import React from 'react';
import './About.css'; // Optional: Add CSS for styling if needed

const About = () => {
  return (
    <div className="about-container">
      <h1>About Cooking Master</h1>
      <p>
        Welcome to <strong>Cooking Master</strong>! Cooking is an art, and here, we aim to bring
        that art into your home with ease. Whether you’re a seasoned chef or just starting your culinary journey, 
        our platform is here to inspire and guide you every step of the way.
      </p>

      <h2>Our Mission</h2>
      <p>
        At Cooking Master, our mission is to make cooking fun, accessible, and exciting for everyone. 
        We believe in the power of home-cooked meals to bring families and friends together.
      </p>

      <h2>What You’ll Find Here</h2>
      <ul>
        <li><strong>Diverse Recipes:</strong> From quick breakfasts to indulgent desserts, explore a variety of dishes to suit your cravings.</li>
        <li><strong>Custom Search:</strong> Use our search tool to find recipes based on your preferences.</li>
        <li><strong>Categories Simplified:</strong> Filter recipes by categories like breakfast, lunch, dinner, and more.</li>
        <li><strong>Inspiration for Everyone:</strong> Whether you have 15 minutes or an hour, we’ve got something for you!</li>
      </ul>

      <h2>Why Cooking Master?</h2>
      <p>
        Cooking Master was created out of a passion for food and a love for sharing recipes. 
        Our goal is to simplify cooking and help you discover the joy of creating delicious meals 
        that are as enjoyable to make as they are to eat.
      </p>

      <h2>Stay Connected</h2>
      <p>
        We’d love to hear from you! Have questions, suggestions, or just want to share your cooking success story? 
        Reach out to us anytime. Together, let’s make every meal a masterpiece!
      </p>
    </div>
  );
};

export default About;
