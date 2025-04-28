const queries = require("../db/usersQueries.js");
const { bcrypt, hash} = require("bcryptjs");
const asyncHandler = require("express-async-handler");



async function createNewUser(req, res, next) {
  try {
    const username = req.body.username;
    const password = req.body.password
    const hashedPassword = await hash(password, 10);
    await queries.addUser(username, hashedPassword);
    res.send("yay");
  } catch (err) {
    return next(err);
  }
}

const allUsernames = asyncHandler(async (req, res) => {
  const usernames = await queries.getAllUsernames();
  if (!usernames) {
    res.status(404).send("Users not found");
    return;
  }
  res.send(usernames.rows);
});

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const user = await queries.userById(userId);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.send(user.rows);
});

module.exports = { allUsernames, createNewUser, getUserById };
