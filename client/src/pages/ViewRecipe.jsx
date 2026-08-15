import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ViewRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5050/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRecipe(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!recipe) return <div className="page-container">Loading...</div>;

  return (
    <div className="page-container">
      <Link to="/recipes" className="back-btn">
        ← Back to Recipes
      </Link>

      <div className="recipe-detail">
        <div className="recipe-detail-image">
          {recipe.image ? (
            <img
              src={`http://localhost:5050/uploads/${recipe.image}`}
              alt={recipe.name}
              style={{ maxWidth: "300px" }}
            />
          ) : (
            "🍽️"
          )}
        </div>
        <h1>{recipe.name}</h1>
        <p className="recipe-meta">
          Category: {recipe.category} | Difficulty: {recipe.difficulty}
        </p>

        <div className="recipe-section">
          <h2>Description</h2>
          <p>{recipe.description}</p>
        </div>

        <div className="recipe-section">
          <h2>Ingredients</h2>
          {recipe.ingredients.map((ing, index) => (
            <p key={index}>
              • {ing.name} - {ing.quantity} {ing.unit}
            </p>
          ))}
        </div>

        <div className="recipe-section">
          <h2>Instructions</h2>
          <p>{recipe.instructions}</p>
        </div>

        <div className="recipe-actions">
          <Link to={`/recipes/edit/${recipe.id}`} className="btn-add">
            Edit Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewRecipe;
