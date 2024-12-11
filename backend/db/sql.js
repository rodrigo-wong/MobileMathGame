/**
 * StAuth10244: I Rodrigo Wong Mac, #000887648 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made 
 * my work available to anyone else.
 */

const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("SQLite error:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      "CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)",
      (err) => {
        if (err) {
          console.error("SQLite error:", err.message);
        } else {
          // Seed users table
          const users = [
            { username: "Rodrigo", password: "Mohawk@2024" },
            { username: "Sara", password: "Mohawk@2024" },
          ];
          const saltRounds = 10;
          users.forEach((user) => {
            bcrypt.hash(user.password, saltRounds, (err, hash) => {
              if (err) {
                console.error("Bcrypt error:", err.message);
              } else {
                db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
                  user.username,
                  hash,
                ]);
              }
            });
          });
        }
      }
    );
  }
});

module.exports = db;
