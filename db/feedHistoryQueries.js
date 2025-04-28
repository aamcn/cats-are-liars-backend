const pool = require("./pool");


// Returns all rows from the feeding_history database table.
async function allEntries() {
  return await pool.query("SELECT * FROM feeding_history;");
}


// Finds and returns the row where the id matches the 'entryId' argument.
async function entryById(entryId) {
  return await pool.query("SELECT * FROM feeding_history WHERE id = ($1)", [
    entryId,
  ]);
}

// Finds and returns all entries where the cat_name matches the 'catName' argument.
async function entriesByCatName(catName) {
  return await pool.query(
    "SELECT * FROM feeding_history WHERE cat_name = ($1)",
    [catName],
  );
}

// Inserts a new row(entry) into the table with the passed in arguments as its values.
async function insertFeedingEntry(entry){
  await pool.query("INSERT INTO feeding_history (catid, cat_name, feeder_id, feeder_username, medication_needed, medication_given, time, notes) values ($1, $2, $3, $4, $5, $6, $7, $8)", [ entry.catId, entry.catName, entry.userId, entry.username, entry.medicationNeeded, entry.medicationGiven, entry.time, entry.notes ],
  );
}

// Finds and deletes the tablel row where the id matches the 'entryId' argument.
async function deleteEntryById(entryId){
  await pool.query("DELETE FROM feeding_history WHERE id = ($1)", [entryId])
}

module.exports = { allEntries, entryById, entriesByCatName, insertFeedingEntry, deleteEntryById};
