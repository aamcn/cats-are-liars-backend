const pool = require("./pool");

async function allEntries() {
  return await pool.query("SELECT * FROM feeding_history;");
}

async function entryById(entryId) {
  return await pool.query("SELECT * FROM feeding_history WHERE id = ($1)", [
    entryId,
  ]);
}

async function entriesByCatName(catName) {
  return await pool.query(
    "SELECT * FROM feeding_history WHERE cat_name = ($1)",
    [catName],
  );
}

module.exports = { allEntries, entryById, entriesByCatName };
