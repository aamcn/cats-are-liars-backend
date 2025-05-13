const pool = require("./pool");


// Returns all usernames stored in the 'users' table. 
async function getAllUsernames() {
  return await pool.query("SELECT username FROM users;");
}

// Inserts a new user into the table using the passed in arguments as its values.
async function addUser(username, password) {
  const newUser = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2)",
    [username, password],
  );
}

// Finds and returns the row where the id matches the 'id' argument.
async function userById(userId) {
  return await pool.query("SELECT username FROM users WHERE id = ($1)", [userId]);
}

async function getAllByHouseholdId(householdId){
  return await pool.query("SELECT id, username, role FROM users WHERE household_id = ($1)", [householdId])
}

module.exports = { getAllUsernames, addUser, userById, getAllByHouseholdId};
