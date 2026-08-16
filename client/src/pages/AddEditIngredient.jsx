import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AddEditIngredient() {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:5050/ingredients", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const found = res.data.find((i) => i.id === Number(id));
          if (found) {
            setName(found.name);
            setUnit(found.unit);
          }
        });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !unit) {
      alert("Name and unit are required");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:5050/ingredients/${id}`,
          { name, unit },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } else {
        await axios.post(
          "http://localhost:5050/ingredients",
          { name, unit },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }
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
      <h1>{isEdit ? "Edit Ingredient" : "Add Ingredient"}</h1>

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
