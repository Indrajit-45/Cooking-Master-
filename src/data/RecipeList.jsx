import React, { useEffect, useState } from "react";
import recipesData from "../data/recipes.json";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Set recipes directly from imported JSON
    setRecipes(recipesData);
  }, []);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
