const pool = require("./pool");


// Returns all rows from the feeding_history database table.
async function allEntries(userId) {
  return await pool.query("SELECT * FROM feeding_history WHERE ($1)=ANY(authorised_feeders);", [userId]);
}


// Finds and returns the row where the id matches the 'entryId' argument.
async function entryById(entryId, userId) {
  return await pool.query("SELECT * FROM feeding_history WHERE id = ($1) AND ($2)=ANY(authorised_feeders)", [
    entryId, userId
  ]);
}

// Finds and returns all entries where the cat_name matches the 'catName' argument.
async function entriesByCatName(catName, userId) {
  return await pool.query("SELECT * FROM feeding_history WHERE cat_name = ($1) AND ($2)=ANY(authorised_feeders)",
    [catName, userId]);
}

// Inserts a new row(entry) into the table with the passed in arguments as its values.
async function insertFeedingEntry(entry, userId){
  await pool.query("INSERT INTO feeding_history (catid, cat_name, feeder_id, feeder_username, medication_needed, medication_given, time, notes, authorised_feeders) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [ entry.catId, entry.catName, userId, entry.username, entry.medicationNeeded, entry.medicationGiven, entry.time, entry.notes, entry.authorisedFeeders],
  );
}

// Finds and deletes the tablel row where the id matches the 'entryId' argument.
async function deleteEntryById(entryId, userId){
  await pool.query("DELETE FROM feeding_history WHERE id = ($1) AND feeder_id = ($2)", [entryId, userId])
}

module.exports = { allEntries, entryById, entriesByCatName, insertFeedingEntry, deleteEntryById};
