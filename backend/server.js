/**
 * StAuth10244: I Rodrigo Wong Mac, #000887648 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made 
 * my work available to anyone else.
 */

const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { redisClient, setupRedis } = require("./db/redis");
const db = require('./db/sql')
const {authenticate} = require('./middleware/authentication')

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
setupRedis();

// Signup endpoint
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;

  // Check if username already exists
  const checkQuery = "SELECT COUNT(*) AS count FROM users WHERE username = ?";
  db.get(checkQuery, [username], (err, row) => {
    if (err) {
      res.status(500).json({ status: "failure", error: err.message });
    } else {
      if (row.count > 0) {
        res.status(400).json({ status: "failure", error: "Username already exists" });
      } else {
        // Username doesn't exist, hash password and insert new user
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            res.status(500).json({ status: "failure", error: err.message });
          } else {
            const insertQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
            db.run(insertQuery, [username, hash], (err) => {
              if (err) {
                res.status(500).json({ status: "failure", error: err.message });
              } else {
                res.json({ status: "success" });
              }
            });
          }
        });
      }
    }
  });
});

// Login endpoint
app.post("/login", authenticate, (req, res) => {
  res.json({ status: "success" });
});

// Update endpoint to only update and trim
app.post("/update", async (req, res) => {
  const { username, result } = req.body;
  try {
    if (result === "correct") {
      await redisClient.lPush("leaderboard", username);
      await redisClient.lTrim("leaderboard", 0, 9);
    }
    const leaders = await redisClient.lRange("leaderboard", 0, -1);
    res.json({ leaders });
  } catch (err) {
    res.status(500).json({ error: "Error updating leaderboard: " + err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
