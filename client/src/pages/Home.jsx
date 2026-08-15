import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page-container">
      <h1>Welcome to Recipe Manager</h1>
      <p>Manage recipes and ingredients, or browse what's available.</p>

      <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
        <Link to="/recipes" className="btn-add">
          Browse Recipes
        </Link>
        <Link to="/ingredients" className="btn-add-ing">
          Browse Ingredients
        </Link>
      </div>
    </div>
  );
}

export default Home;
