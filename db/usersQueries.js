const pool = require("./pool");

// Returns all usernames stored in the 'users' table.
async function getAllUsernames() {
  try {
    return await pool.query("SELECT username FROM users;");
  } catch (error) {
    console.error("Error fetching all usernames:", error);
    throw error;
  }
}

// Inserts a new user into the table using the passed in arguments as its values.
async function addUser(username, password) {
  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      password,
    ]);
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

// Finds and returns the row where the id matches the 'id' argument.
async function userById(userId) {
  try {
    return await pool.query("SELECT username FROM users WHERE id = ($1)", [
      userId,
    ]);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

async function getAllByHouseholdId(householdId) {
  try {
    return await pool.query(
      "SELECT id, username, household_name, role FROM users INNER JOIN household ON users.household_id = ($1)",
      [householdId]
    );
  } catch (error) {
    console.error("Error fetching users by household ID:", error);
    throw error;
  }
}

module.exports = { getAllUsernames, addUser, userById, getAllByHouseholdId };
