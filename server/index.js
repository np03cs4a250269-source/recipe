import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./routes/auth.js";
import RecipeRoute from "./routes/recipes.js";
import IngredientRoute from "./routes/ingredients.js";

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Recipe Manager API is running");
});

app.use("/", AuthRoute);
app.use("/", RecipeRoute);
app.use("/", IngredientRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
