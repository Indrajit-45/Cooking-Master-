import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import Spinner from './Spinner';
import './Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';

const API_KEY = 'bc24dc6a58f64208943cf6022d10a3b6';

const Main = ({ searchQuery, setSearchQuery, recipes, setRecipes }) => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  // Ref for the search box
  const searchRef = useRef(null);

  useEffect(() => {
    if (recipes.length === 0 && !searchQuery) {
      fetchFeaturedRecipes();
    }
  }, [recipes, searchQuery]);

  const fetchRecipes = async (query, category) => {
    setLoading(true);
    try {
      let url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
        query
      )}&apiKey=${API_KEY}&addRecipeInformation=true`;
      if (category) url += `&type=${category}`;
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
  
      const data = await response.json();
      setRecipes(
        data.results.map((recipe) => ({
          id: recipe.id,
          name: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes || 'N/A', // Default if not available
        }))
      );
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchFeaturedRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=6&apiKey=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch featured recipes');
      }
      const data = await response.json();
      setRecipes(
        data.recipes.map((recipe) => ({
          id: recipe.id,
          name: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes
        }))
      );
    } catch (error) {
      console.error('Error fetching featured recipes:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    const newCategory = selectedCategory === category ? '' : category;
    setSelectedCategory(newCategory);
    fetchRecipes(searchQuery, newCategory);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchRecipes(searchQuery, selectedCategory);
    }
  };

  const scrollToSearch = () => {
    if (searchRef.current) {
      const offset = 250; // Adjust this to match your navbar height in pixels
      const elementPosition = searchRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
  
  
  

  return (
    <main>
      <HeroSection />
      <div className="Section-titleArea">
        <h2>Recipe Finder</h2>
        <p>Find meals and snacks that fit your preferences.</p>
      </div>

      <section className="search-section" ref={searchRef}>
        <input
          type="text"
          placeholder="Search for a recipe..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </section>

      <section className="category-filters">
        <button
          onClick={() => handleCategoryClick('breakfast')}
          className={selectedCategory === 'breakfast' ? 'active' : ''}
        >
          Breakfast
        </button>
        <button
          onClick={() => handleCategoryClick('lunch')}
          className={selectedCategory === 'lunch' ? 'active' : ''}
        >
          Lunch
        </button>
        <button
          onClick={() => handleCategoryClick('dinner')}
          className={selectedCategory === 'dinner' ? 'active' : ''}
        >
          Dinner
        </button>
        <button
          onClick={() => handleCategoryClick('snack')}
          className={selectedCategory === 'snack' ? 'active' : ''}
        >
          Snack/Side
        </button>
        <button
          onClick={() => handleCategoryClick('dessert')}
          className={selectedCategory === 'dessert' ? 'active' : ''}
        >
          Dessert
        </button>
      </section>

      <section className="recipes">
        <h2 className="recipes-box-title">Recipes</h2>
        {loading ? (
          <Spinner />
        ) : recipes.length > 0 ? (
          <div className="recipe-cards">
            {recipes.map((recipe) => (
              <div key={recipe.id}><div
                
                className="card"
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              >
                <img src={recipe.image} alt={recipe.name} />
                <p>{recipe.name}</p>
                <div className='CardBadge'>
                  <div className='readyInMinutes'>{recipe.readyInMinutes}</div>
                  <div className='min'>min</div>
                </div>
              </div></div>
            ))}
          </div>
        ) : (
          <p className="No-recipes-found-Text">No recipes found!</p>
        )}
      </section>

      <section className="backToTop-box">
        <button className="backToTop-button" onClick={scrollToSearch}>
          <p>Back to Search</p>
          <div className="ArrowUp-Long-icon">
            <FontAwesomeIcon icon={faArrowUpLong} />
          </div>
        </button>
      </section>
    </main>
  );
};

export default Main;
