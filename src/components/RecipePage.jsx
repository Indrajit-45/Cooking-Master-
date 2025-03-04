import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner'; // Import Spinner component
import './RecipePage.css';

const API_KEY = 'bc24dc6a58f64208943cf6022d10a3b6';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false); // To track if the recipe is already added

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        );
        const data = await response.json();
        setRecipe(data);

        // Check if the recipe is already in the cart
        const storedCart = JSON.parse(localStorage.getItem('recipeCart')) || [];
        const isRecipeInCart = storedCart.some((item) => item.id === data.id);
        setIsAdded(isRecipeInCart);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleToggleCart = () => {
    if (recipe) {
      const storedCart = JSON.parse(localStorage.getItem('recipeCart')) || [];
      const shortDescription = recipe.summary ? recipe.summary.substring(0, 100) + '...' : ''; // Short description
  
      if (isAdded) {
        // Remove the recipe from the cart
        const updatedCart = storedCart.filter((item) => item.id !== recipe.id);
        localStorage.setItem('recipeCart', JSON.stringify(updatedCart));
        setIsAdded(false);
      } else {
        // Add the recipe to the cart with short description
        const updatedCart = [
          ...storedCart,
          { id: recipe.id, title: recipe.title, readyInMinutes: recipe.readyInMinutes, image: recipe.image, description: shortDescription},
        ];
        localStorage.setItem('recipeCart', JSON.stringify(updatedCart));
        setIsAdded(true);
      }
    }
  };

  const getNutrient = (title) => {
    if (recipe.nutrition && recipe.nutrition.nutrients) {
      const nutrient = recipe.nutrition.nutrients.find((n) => n.title === title);
      return nutrient ? nutrient.amount : null;
      
    }
    return console.log(recipe);;
  };

  const cleanText = (text) => {
    return text.replace(/\\+/g, '');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner /> {/* Show the spinner during loading */}
      </div>
    );
  }

  if (!recipe) {
    return <p>Recipe not found!</p>;
  }

  

  return (
    <div className="recipe-page">

      <div className="recipe-header">
        <img className="recipe-image" src={recipe.image} alt={recipe.title} />
        <h1 className='recipe-title'>{recipe.title}</h1>
      </div>

      <div className='dietary-info-box'>
      <div className="dietary-info">
        <h3>Dietary Information</h3>
        {recipe.vegetarian && <p><b>Vegetarian:</b> <b className='yes'>Yes</b></p>}
        {recipe.vegan && <p><b>Vegan:</b> <b className='yes'>Yes</b></p>}
        {recipe.dairyFree && <p><b>Dairy-Free:</b> <b className='yes'>Yes</b></p>}
        {!recipe.vegetarian && <p><b>Vegetarian:</b> <b className='no'>No</b></p>}
        {!recipe.vegan && <p><b>Vegan:</b> <b className='no'>No</b></p>}
        {!recipe.dairyFree && <p><b>Dairy-Free:</b> <b className='no'>No</b></p>}
        <button
          className={`toggle-cart ${isAdded ? 'added' : ''}`}
          onClick={handleToggleCart}
        >
          {isAdded ? 'Remove from Cart' : 'Add to Resipe Cart'}
        </button>
      </div>
      </div>
      
      
      
      <div className="recipe-description">
        <div className='recipe-description-main-box'>
          <h2 className='About-Recipe-heading'>About Recipe</h2>
          <div
            dangerouslySetInnerHTML={{ __html: cleanText(recipe.summary || '') }}
           className='description'/>
        </div>
      </div>
       
      <div className='recipe-instructions-box'>
      <div className="recipe-instructions">
        <h2 className='instructions-heading'>Instructions</h2>
        <div
          dangerouslySetInnerHTML={{ __html: cleanText(recipe.instructions || '') }}
         className='instructions'/>
      </div>
      </div>


      <div className='Ingredients-box'>
      <div className='main-Ingredients-box'>
        <h3 className='Ingredients-heading'>Ingredients</h3>
        <ul className='Ingredients'>
          {recipe.extendedIngredients?.map((ingredient, index) => (
            <li key={`${ingredient.id}-${index}`}>{ingredient.original}</li>
          ))}
        </ul>
      </div>
      </div>

    </div>
  );
};

export default RecipePage;
