import { Link } from "react-router-dom";

function UserRecipeList() {
  // fake data for now
  const recipes = [
    {
      id: 1,
      name: "Momo",
      category: "Nepali",
      difficulty: "medium",
      icon: "🥟",
    },
    {
      id: 2,
      name: "Pasta",
      category: "Italian",
      difficulty: "easy",
      icon: "🍝",
    },
    {
      id: 3,
      name: "Dal Bhat",
      category: "Nepali",
      difficulty: "easy",
      icon: "🍛",
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>All Recipes</h1>
      </div>

      <input
        type="text"
        placeholder="Search recipes..."
        className="search-bar"
      />

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-image">{recipe.icon}</div>
            <h3>{recipe.name}</h3>
            <p>Category: {recipe.category}</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <Link to={`/my-recipes/${recipe.id}`}>View Recipe</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRecipeList;
