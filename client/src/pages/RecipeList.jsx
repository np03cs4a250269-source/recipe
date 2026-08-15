import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5050/recipes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filtered = recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.difficulty || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>All Recipes</h1>
        <Link to="/recipes/add" className="btn-add">
          + Add Recipe
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by name or difficulty..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="recipe-grid">
        {filtered.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-image">
              {recipe.image ? (
                <img
                  src={`http://localhost:5050/uploads/${recipe.image}`}
                  alt={recipe.name}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              ) : (
                "🍽️"
              )}
            </div>
            <h3>{recipe.name}</h3>
            <p>Category: {recipe.category}</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <Link to={`/recipes/${recipe.id}`}>View Recipe</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
