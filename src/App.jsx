import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import RecipePage from './components/RecipePage';
import CardPage from './components/CardPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './components/About';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]); // Recipes are managed here to persist across routes

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Main
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            recipes={recipes}
            setRecipes={setRecipes}
          />
          <Footer />
        </>
      ),
    },
    {
      path: '/recipe/:id',
      element: (
        <>
        <Navbar />
        <RecipePage />
        </>
      )
    },
    {
      path: '/cardPage',
      element: (
        <>
          <Navbar />
          <CardPage />
          
        </>
      ),
    },
    {
      path: '/about',
      element: (
        <>
          <Navbar />
          <About/>
          
        </>
      ),
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
