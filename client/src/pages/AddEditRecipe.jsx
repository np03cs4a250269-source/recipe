import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddEditRecipe() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [image, setImage] = useState(null);
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5050/ingredients", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAllIngredients(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addIngredientRow = () => {
    setSelectedIngredients([
      ...selectedIngredients,
      { ingredient_id: "", quantity: "" },
    ]);
  };

  const removeIngredientRow = (index) => {
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
  };

  const updateIngredientRow = (index, field, value) => {
    const updated = [...selectedIngredients];
    updated[index][field] = value;
    setSelectedIngredients(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !instructions) {
      alert("Name, description, and instructions are required");
      return;
    }
    if (selectedIngredients.some((ing) => Number(ing.quantity) < 0)) {
      alert("Quantity cannot be negative");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("instructions", instructions);
    formData.append("category", category);
    formData.append("difficulty", difficulty);
    if (image) formData.append("image", image);
    formData.append("ingredients", JSON.stringify(selectedIngredients));

    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5050/recipes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Recipe saved!");
      navigate("/recipes");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save recipe");
    }
  };

  return (
    <div className="page-container">
      <Link to="/recipes" className="back-btn">
        ← Back to Recipes
      </Link>
      <h1>Add New Recipe</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Recipe Name</label>
          <input
            type="text"
            placeholder="Enter recipe name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            placeholder="e.g. Nepali, Italian"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Instructions</label>
          <textarea
            placeholder="Enter instructions step by step"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          {selectedIngredients.map((row, index) => (
            <div
              key={index}
              style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
            >
              <select
                value={row.ingredient_id}
                onChange={(e) =>
                  updateIngredientRow(index, "ingredient_id", e.target.value)
                }
                style={{ flex: 2 }}
              >
                <option value="">Select ingredient</option>
                {allIngredients.map((ing) => (
                  <option key={ing.id} value={ing.id}>
                    {ing.name} ({ing.unit})
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Quantity"
                value={row.quantity}
                onChange={(e) =>
                  updateIngredientRow(index, "quantity", e.target.value)
                }
                style={{ flex: 1 }}
                min="0"
              />
              <button
                type="button"
                onClick={() => removeIngredientRow(index)}
                style={{ width: "auto", padding: "8px 12px" }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredientRow}
            style={{ background: "#0f3460" }}
          >
            + Add Ingredient
          </button>
        </div>

        <div className="form-group">
          <label>Recipe Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit">Save Recipe</button>
      </form>
    </div>
  );
}

export default AddEditRecipe;
