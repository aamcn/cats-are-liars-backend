
const pool = require("./pool");


async function allCats(){
    return await pool.query("SELECT * FROM cats;"); 
}

async function catByName(name){
    console.log(name)
    return await pool.query("SELECT * FROM cats WHERE name = ($1)", [name])
}

async function catByCatId(id){
    console.log(id)
    return await pool.query("SELECT * FROM cats WHERE catId = ($1)", [id])
}

async function addCatToTable(name, meals, medication){
    const newCat = await pool.query("INSERT INTO cats (name, meals, medication) VALUES ($1, $2, $3)", [
        name,
        meals,
        medication
      ])
}

async function updateCat(name, meals, medication, catid){
    const updateCat =   await pool.query("UPDATE cats SET name = ($1), meals = ($2), medication = ($3) WHERE catid = ($4)", [
        name,
        meals,
        medication,
        catid
      ])
}

async function addCatFeeder(userId, catId){
    const addFeeder = await pool.query("UPDATE cats SET feeder_userid = feeder_userid || ($1) WHERE catid = ($2)", [[userId], catId])
}

module.exports = { addCatToTable, allCats, catByName, catByCatId, updateCat, addCatFeeder}; 