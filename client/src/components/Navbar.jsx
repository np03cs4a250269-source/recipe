import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navrbar">
      <div className="Name">RECIPE MANAGER</div>
      <div className="links">
        <Link to="/recipes">Recipes</Link>
        <Link to="/ingredients">Ingredient</Link>
      </div>
    </nav>
  );
}
export default Navbar;
