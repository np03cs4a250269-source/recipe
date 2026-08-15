import { Link } from "react-router-dom";

function UserViewRecipe() {
  // fake data for now
  const recipe = {
    icon: "🥟",
    name: "Momo",
    category: "Nepali",
    difficulty: "Medium",
    description: "Delicious Nepali dumplings filled with meat or vegetables.",
    instructions:
      "1. Make dough\n2. Prepare filling\n3. Fill and fold\n4. Steam for 15 mins",
    ingredients: [
      { name: "Flour", quantity: "2", unit: "cups" },
      { name: "Minced Meat", quantity: "500", unit: "grams" },
      { name: "Onion", quantity: "2", unit: "pieces" },
    ],
  };

  return (
    <div className="page-container">
      <Link to="/my-recipes" className="back-btn">
        ← Back to Recipes
      </Link>

      <div className="recipe-detail">
        <div className="recipe-detail-image">{recipe.icon}</div>
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
      </div>
    </div>
  );
}

export default UserViewRecipe;
