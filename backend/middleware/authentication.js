/**
 * StAuth10244: I Rodrigo Wong Mac, #000887648 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made 
 * my work available to anyone else.
 */

const bcrypt = require("bcrypt");
const db = require("../db/sql");

// Middleware for login
const authenticate = (req, res, next) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ?";
  db.get(query, [username], (err, row) => {
    if (err) {
      res.status(500).json({ status: "failure", error: err.message });
    } else if (row) {
      bcrypt.compare(password, row.password, (err, result) => {
        if (err) {
          res.status(500).json({ status: "failure", error: err.message });
        } else if (result) {
          next();
        } else {
          res.json({ status: "failure" });
        }
      });
    } else {
      res.json({ status: "failure" });
    }
  });
};

module.exports = { authenticate };
