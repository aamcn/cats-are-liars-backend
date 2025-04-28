const pool = require("./pool");


// Returns all rows from the 'cats' table that contain a feeder_userid that matches the passed in argument
async function allCats(userId) {
  console.log(userId)
  return await pool.query("SELECT * FROM cats WHERE  ($1)=ANY(feeder_userid)", [userId]);
}

// Returns table row with both a name matching the 'catName' argument and a feeder_userid matching the 'userId' argument.
async function catByName(catName, userId) {
  return await pool.query("SELECT * FROM cats WHERE name = ($1) AND ($2)=ANY(feeder_userid)", [catName, userId]);
}

// Returns table row with both a catId matching the 'catId' argument and a feeder_userid matching the 'userId' argument.
async function catByCatId(catId, userId) {
  return await pool.query("SELECT * FROM cats WHERE catId = ($1) AND ($2)=ANY(feeder_userid)", [catId, userId]);
}

// Inserts a new row into the 'cats' table and populates it's columns with the passed in arguments.
async function addCatToTable(name, meals, medication, userId) {
  const newCat = await pool.query(
    "INSERT INTO cats (name, meals, medication, feeder_userid) VALUES ($1, $2, $3, $4)",
    [name, meals, medication, [userId]],
  );
}

// Updates an existing 'cats' row with the passed in arguments where the feeder_userid matches the 'userId' argument.
async function updateCat(catName, meals, medication, catid, userId) {
  const updateCat = await pool.query(
    "UPDATE cats SET name = ($1), meals = ($2), medication = ($3) WHERE catid = ($4) AND ($5)=ANY(feeder_userid)",
    [catName, meals, medication, catid, userId],
  );
}

/*
Finds the 'cats' row where the feeder_userid array contains the 'userId' argument and then adds the 'newFeederId' argument to the 
feeder_userid array.
*/

async function addCatFeeder(newFeederId, catId, userId) {
  const addFeeder = await pool.query(
    "UPDATE cats SET feeder_userid = feeder_userid || ($1) WHERE catid = ($2) AND ($3)=ANY(feeder_userid)",
    [[newFeederId], catId, userId],
  );
}

module.exports = {
  addCatToTable,
  allCats,
  catByName,
  catByCatId,
  updateCat,
  addCatFeeder,
};
