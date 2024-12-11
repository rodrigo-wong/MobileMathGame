/**
 * StAuth10244: I Rodrigo Wong Mac, #000887648 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made 
 * my work available to anyone else.
 */

const redis = require("redis");

// Set up Redis client
const redisClient = redis.createClient({
  url: "redis://localhost:6379",
});

const setupRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis client is ready");
    // Seed leaderboard in Redis
    const leaderboard = ["Robert", "Selena", "Adam", "Lamar", "Jessica"];
    await redisClient.del("leaderboard");
    await Promise.all(
      leaderboard
        .reverse()
        .map((username) => redisClient.lPush("leaderboard", username))
    );
  } catch (err) {
    console.error("Failed to set up Redis:", err);
  }
};

module.exports = { redisClient, setupRedis };
