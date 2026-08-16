import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function IngredientList() {
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5050/ingredients", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setIngredients(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this ingredient?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5050/ingredients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchIngredients();
    } catch (err) {
      alert("Failed to delete ingredient");
    }
  };

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
              <td style={{ display: "flex", gap: "10px" }}>
                <Link to={`/ingredients/edit/${ing.id}`} className="btn-edit">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(ing.id)}
                  style={{ width: "auto", padding: "5px 15px", margin: 0 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IngredientList;
