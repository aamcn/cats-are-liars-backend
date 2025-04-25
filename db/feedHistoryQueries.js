

const pool = require("./pool");


async function  getAllEntries(){
    return await pool.query("SELECT * FROM feeding_history;"); 
}

module.exports = { getAllEntries };

