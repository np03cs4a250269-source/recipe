import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function IngredientList() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5050/ingredients", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setIngredients(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>All Ingredients</h1>
        <Link to="/ingredients/add" className="btn-add-ing">
          + Add Ingredient
        </Link>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Ingredient Name</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ing) => (
            <tr key={ing.id}>
              <td>{ing.id}</td>
              <td>{ing.name}</td>
              <td>{ing.unit}</td>
              <td>
                <Link to={`/ingredients/edit/${ing.id}`} className="btn-edit">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IngredientList;
