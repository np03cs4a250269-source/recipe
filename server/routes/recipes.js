import express from "express";
import multer from "multer";
import db from "../db.js";
import verifyToken from "../middleware/auth.js";
import verifyAdmin from "../middleware/admin.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/recipes", verifyToken, (req, res) => {
  db.query("SELECT * FROM recipes", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching recipes" });
    res.json(results);
  });
});

router.get("/recipes/:id", verifyToken, (req, res) => {
  db.query(
    "SELECT * FROM recipes WHERE id = ?",
    [req.params.id],
    (err, recipeResults) => {
      if (err)
        return res.status(500).json({ message: "Error fetching recipe" });
      if (recipeResults.length === 0)
        return res.status(404).json({ message: "Recipe not found" });

      const sql = `SELECT ri.quantity, i.name, i.unit FROM recipe_ingredients ri
                 JOIN ingredients i ON ri.ingredient_id = i.id WHERE ri.recipe_id = ?`;
      db.query(sql, [req.params.id], (err2, ingredientResults) => {
        if (err2) {
          console.log("INGREDIENT QUERY ERROR:", err2);
          return res
            .status(500)
            .json({ message: "Error fetching ingredients" });
        }
        res.json({ ...recipeResults[0], ingredients: ingredientResults });
      });
    },
  );
});

router.post(
  "/recipes",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  (req, res) => {
    const {
      name,
      category,
      difficulty,
      description,
      instructions,
      ingredients,
    } = req.body;

    if (!name || !description || !instructions) {
      return res
        .status(400)
        .json({ message: "Name, description, and instructions are required" });
    }

    const image = req.file ? req.file.filename : null;

    const sql = `INSERT INTO recipes (name, category, difficulty, description, instructions, image)
               VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [name, category, difficulty, description, instructions, image],
      (err, result) => {
        if (err)
          return res.status(500).json({ message: "Error adding recipe" });

        const recipeId = result.insertId;
        const parsedIngredients = ingredients ? JSON.parse(ingredients) : [];

        if (parsedIngredients.length === 0) {
          return res
            .status(201)
            .json({ message: "Recipe added", id: recipeId });
        }

        const values = parsedIngredients.map((ing) => [
          recipeId,
          ing.ingredient_id,
          ing.quantity,
        ]);
        db.query(
          "INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) VALUES ?",
          [values],
          (err2) => {
            if (err2)
              return res
                .status(500)
                .json({ message: "Recipe added but ingredients failed" });
            res.status(201).json({ message: "Recipe added", id: recipeId });
          },
        );
      },
    );
  },
);

router.delete("/recipes/:id", verifyToken, verifyAdmin, (req, res) => {
  db.query(
    "DELETE FROM recipe_ingredients WHERE recipe_id = ?",
    [req.params.id],
    (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error clearing recipe ingredients" });

      db.query("DELETE FROM recipes WHERE id = ?", [req.params.id], (err2) => {
        if (err2)
          return res.status(500).json({ message: "Error deleting recipe" });
        res.json({ message: "Recipe deleted" });
      });
    },
  );
});
router.put(
  "/recipes/:id",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  (req, res) => {
    const {
      name,
      category,
      difficulty,
      description,
      instructions,
      ingredients,
    } = req.body;

    if (!name || !description || !instructions) {
      return res
        .status(400)
        .json({ message: "Name, description, and instructions are required" });
    }

    let sql =
      "UPDATE recipes SET name=?, category=?, difficulty=?, description=?, instructions=?";
    let params = [name, category, difficulty, description, instructions];

    if (req.file) {
      sql += ", image=?";
      params.push(req.file.filename);
    }
    sql += " WHERE id=?";
    params.push(req.params.id);

    db.query(sql, params, (err) => {
      if (err)
        return res.status(500).json({ message: "Error updating recipe" });

      db.query(
        "DELETE FROM recipe_ingredients WHERE recipe_id=?",
        [req.params.id],
        (err2) => {
          if (err2)
            return res
              .status(500)
              .json({ message: "Error clearing old ingredients" });

          const parsedIngredients = ingredients ? JSON.parse(ingredients) : [];
          if (parsedIngredients.length === 0) {
            return res.json({ message: "Recipe updated" });
          }

          const values = parsedIngredients.map((ing) => [
            req.params.id,
            ing.ingredient_id,
            ing.quantity,
          ]);
          db.query(
            "INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) VALUES ?",
            [values],
            (err3) => {
              if (err3)
                return res
                  .status(500)
                  .json({ message: "Recipe updated but ingredients failed" });
              res.json({ message: "Recipe updated" });
            },
          );
        },
      );
    });
  },
);

export default router;
