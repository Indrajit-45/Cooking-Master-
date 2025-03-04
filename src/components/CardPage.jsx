import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardPage.css';

const CardPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch recipes from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('recipeCart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((recipe) => recipe.id !== id);
    setCart(updatedCart);
    localStorage.setItem('recipeCart', JSON.stringify(updatedCart));
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your recipe cart is empty!</h2>
        <p>Looks like you haven't added any recipes yet.</p>
        <button className="browse-recipes-btn" onClick={() => navigate('/')}>
          Browse Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="card-page">
      <h1>Your Recipe Cart</h1>
      <div className="cart-items">
        {cart.map((recipe) => (
          <div key={recipe.id} className='card-box'>
          <div className="cart-card">
            <img src={recipe.image} alt={recipe.title} />
            <div className='CardBadge'>
              <div className='readyInMinutes'>{recipe.readyInMinutes}</div>
              <div className='min'>min</div>
            </div>
            <p className='cart-recipe-title'>{recipe.title}</p>
            <div className="cart-info">
              <button
                className="view-button"
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              >
                View Recipe
              </button>
              <button
                className="remove-button"
                onClick={() => handleRemove(recipe.id)}
              >
                Remove
              </button>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPage;
