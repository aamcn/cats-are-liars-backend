
const pool = require("./pool");


async function getAllUsernames(){
    return await pool.query("SELECT username FROM users;"); 
}

async function addUser(username,password){
    const newUser = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      password,
    ])
}

async function userById(id){
  console.log(id)
  return await pool.query("SELECT username FROM users WHERE id = ($1)", [id])
}

module.exports = { getAllUsernames, addUser, userById };