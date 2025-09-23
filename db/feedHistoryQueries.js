const pool = require("./pool");

// Returns all rows from the feeding_history database table.
async function allEntries(userId) {
  try {
    return await pool.query(
      "SELECT * FROM feeding_history WHERE ($1)=ANY(authorised_feeders);",
      [userId],
    );
  } catch (error) {
    console.error("Error fetching all feeding history entries:", error);
    throw error;
  }
}

async function allEntriesBetweenDates(fromDate, toDate, userId) {
  try {
    return await pool.query(
      `SELECT * FROM feeding_history WHERE date >= ($1) AND date < ($2) AND '${userId}'=ANY(authorised_feeders)`,
      [fromDate, toDate],
    );
  } catch (error) {
    console.error(
      "Error fetching feeding history entries between dates:",
      error,
    );
    throw error;
  }
}

async function allByMonthYear(month, year, userId) {
  try {
    return await pool.query(
      `SELECT * FROM feeding_history WHERE date::text LIKE '${year}-${month}%' AND '${userId}'=ANY(authorised_feeders);`,
    );
  } catch (error) {
    console.error(
      "Error fetching feeding history entries by month and year:",
      error,
    );
    throw error;
  }
}

async function allByYear(year, userId) {
  try {
    return await pool.query(
      `SELECT * FROM feeding_history WHERE date::text LIKE '${year}%' AND '${userId}'=ANY(authorised_feeders);`,
    );
  } catch (error) {
    console.error("Error fetching feeding history entries by year:", error);
    throw error;
  }
}

// Finds and returns the row where the id matches the 'entryId' argument.
async function entryById(entryId, userId) {
  try {
    return await pool.query(
      "SELECT * FROM feeding_history WHERE id = ($1) AND ($2)=ANY(authorised_feeders)",
      [entryId, userId],
    );
  } catch (error) {
    console.error("Error fetching feeding history entry by ID:", error);
    throw error;
  }
}

// Finds and returns all entries where the cat_name matches the 'catName' argument.
async function entriesByCatName(catName, userId) {
  try {
    return await pool.query(
      "SELECT * FROM feeding_history WHERE cat_name = ($1) AND ($2)=ANY(authorised_feeders)",
      [catName, userId],
    );
  } catch (error) {
    console.error("Error fetching feeding history entries by cat name:", error);
    throw error;
  }
}

// Inserts a new row(entry) into the table with the passed in arguments as its values.
async function insertFeedingEntry(entry, user) {
  try {
    await pool.query(
      "INSERT INTO feeding_history (catid, cat_name, feeder_id, feeder_username, medication_needed, medication_given, time, notes, authorised_feeders) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        entry.catid,
        entry.cat_name,
        user.id,
        entry.feeder_username,
        entry.medication_needed,
        entry.medication_given,
        entry.time,
        entry.notes,
        entry.authorised_feeders.split(","),
      ],
    );
  } catch (error) {
    console.error("Error adding feeding history entry:", error);
    throw error;
  }
}

// Finds and deletes the table row where the id matches the 'entryId' argument.
async function deleteEntryById(entryId, userId) {
  try {
    await pool.query(
      "DELETE FROM feeding_history WHERE id = ($1) AND feeder_id = ($2)",
      [entryId, userId],
    );
  } catch (error) {
    console.error("Error deleting feeding history entry by id:", error);
    throw error;
  }
}

module.exports = {
  allEntries,
  entryById,
  entriesByCatName,
  insertFeedingEntry,
  deleteEntryById,
  allByMonthYear,
  allByYear,
  allEntriesBetweenDates,
};
