import "@libsql/client";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { db } from "./lib/db";

const app = express();

app.use(cors());
app.use(express.json());

// Mirror: GET /api/hello
app.get("/api/hello", (_req, res) => {
  res.json({ msg: "hello from chai codeeee" });
});

// Mirror: GET /api/users
app.get("/api/users", async (_req, res) => {
  try {
    const result = await db.execute({ sql: "SELECT * FROM users_data" });
    res.json(result.rows ?? []);
  } catch (error) {
    res.status(500).json({ err: "Failed to fetch users" });
  }
});

// Mirror: POST /api/users
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ err: "Name and Email are required" });
  }

  try {
    const result = await db.execute({
      sql: "INSERT INTO users_data (name, email) VALUES(?, ?)",
      args: [name, email],
    });

    const id = result.lastInsertRowid ?? Date.now().toString();
    res.status(201).json({ id, name, email });
  } catch (error) {
    res.status(500).json({ err: "Failed to create user" });
  }
});

// Mirror: GET /api/users/:id
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.execute({
      sql: "SELECT * FROM users_data WHERE id = ?",
      args: [id],
    });
    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ err: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ err: "Failed to fetch user" });
  }
});

// Mirror: PATCH /api/users/:id (partial update)
app.patch("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body || {};
  if (name === undefined && email === undefined) {
    return res
      .status(400)
      .json({ err: "At least one of Name or Email is required" });
  }

  try {
    await db.execute({
      sql: "UPDATE users_data SET name = COALESCE(?, name), email = COALESCE(?, email) WHERE id = ?",
      args: [name, email, id],
    });

    const updated = await db.execute({
      sql: "SELECT * FROM users_data WHERE id = ?",
      args: [id],
    });
    if (!updated.rows || updated.rows.length === 0)
      return res.status(404).json({ err: "User not found" });
    res.json(updated.rows[0]);
  } catch (error) {
    res.status(500).json({ err: "Failed to update user" });
  }
});

// Mirror: PUT /api/users/:id (full replace)
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ err: "Name and Email are required" });
  }

  try {
    await db.execute({
      sql: "UPDATE users_data SET name = ?, email = ? WHERE id = ?",
      args: [name, email, id],
    });

    const updated = await db.execute({
      sql: "SELECT * FROM users_data WHERE id = ?",
      args: [id],
    });
    if (!updated.rows || updated.rows.length === 0)
      return res.status(404).json({ err: "User not found" });
    res.json(updated.rows[0]);
  } catch (error) {
    res.status(500).json({ err: "Failed to update user" });
  }
});

// Mirror: DELETE /api/users/:id
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const found = await db.execute({
      sql: "SELECT * FROM users_data WHERE id = ?",
      args: [id],
    });
    if (!found.rows || found.rows.length === 0)
      return res.status(404).json({ err: "User not found" });

    await db.execute({
      sql: "DELETE FROM users_data WHERE id = ?",
      args: [id],
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ err: "Failed to delete user" });
  }
});

const PORT =  3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
