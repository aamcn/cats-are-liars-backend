
const queries = require("../db/usersQueries.js")



async function createNewUser(req, res) {
    const username = req.body.username 
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    try{
        await queries.addUser(username, hashedPassword)
        res.send('yay')
    } catch(err) {
        return next(err)
    }
}

async function allUsernames(req, res) {
    const usernames =  await queries.getAllUsernames();
    console.log(usernames.rows)
    res.send(usernames.rows)
 } 
 
async function getUserById(req, res) {
    const id = req.body.id
    const user = await queries.userById(id);
    console.log(user.rows)
    res.send(user.rows)
}

module.exports = { allUsernames, createNewUser, getUserById}
