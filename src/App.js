  import React,{useEffect, useState} from 'react';
import Recipe from './Recipe'


const App = () => {
  const APP_ID = '2690cc15';
  const APP_KEY = 'f25cc85ce6d3c066769ccafb042167e3';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const getRecipes = async () => {
        const response = await fetch(
          `https://api.edamam.com/search?q=${search||"chicken"}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );   
        const data = await response.json();
        setRecipes(data.hits);
      };
      getRecipes();
    } catch (error) {
      // handle error here
      console.error(error);
    }
  }, [search]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />

        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
        />
      ))}
    </div>
  );
};

export default App;