import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddEditIngredient() {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !unit) {
      alert("Name and unit are required");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5050/ingredients",
        { name, unit },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Ingredient saved!");
      navigate("/ingredients");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save ingredient");
    }
  };

  return (
    <div className="page-container">
      <Link to="/ingredients" className="back-btn">
        ← Back to Ingredients
      </Link>
      <h1>Add/Edit Ingredient</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Ingredient Name</label>
          <input
            type="text"
            placeholder="e.g. Flour"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Unit of Measurement</label>
          <input
            type="text"
            placeholder="e.g. grams, ml, teaspoon"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>

        <button type="submit">Save Ingredient</button>
      </form>
    </div>
  );
}

export default AddEditIngredient;
