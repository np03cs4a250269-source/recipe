import express from "express";
import db from "../db.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

// GET all ingredients
router.get("/ingredients", verifyToken, (req, res) => {
  db.query("SELECT * FROM ingredients", (err, results) => {
    if (err)
      return res.status(500).json({ message: "Error fetching ingredients" });
    res.json(results);
  });
});

// ADD ingredient
router.post("/ingredients", verifyToken, (req, res) => {
  const { name, unit } = req.body;
  if (!name || !unit) {
    return res.status(400).json({ message: "Name and unit are required" });
  }
  db.query(
    "INSERT INTO ingredients (name, unit) VALUES (?, ?)",
    [name, unit],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Error adding ingredient" });
      res.status(201).json({ id: result.insertId, name, unit });
    },
  );
});

// EDIT ingredient
router.put("/ingredients/:id", verifyToken, (req, res) => {
  const { name, unit } = req.body;
  if (!name || !unit) {
    return res.status(400).json({ message: "Name and unit are required" });
  }
  db.query(
    "UPDATE ingredients SET name = ?, unit = ? WHERE id = ?",
    [name, unit, req.params.id],
    (err) => {
      if (err)
        return res.status(500).json({ message: "Error updating ingredient" });
      res.json({ message: "Ingredient updated" });
    },
  );
});

// DELETE ingredient
router.delete("/ingredients/:id", verifyToken, (req, res) => {
  db.query("DELETE FROM ingredients WHERE id = ?", [req.params.id], (err) => {
    if (err)
      return res.status(500).json({ message: "Error deleting ingredient" });
    res.json({ message: "Ingredient deleted" });
  });
});

export default router;
