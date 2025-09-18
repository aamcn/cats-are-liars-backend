const queries = require("../db/usersQueries.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

async function createNewUser(req, res, next) {
  try {
    const username = req.body.username;
    await queries.addUser(username);
    res.send("Added user");
  } catch (err) {
    return next(err);
  }
}

const allUsernames = asyncHandler(async (req, res, next) => {
  try {
    const usernames = await queries.getAllUsernames();
    if (!usernames) {
      res.status(404).send("Users not found");
      return;
    }
    res.send(usernames.rows);
  } catch (err) {
    return next(err);
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await queries.userById(userId);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.send(user.rows);
});

const getUsersByHouseholdId = asyncHandler(async (req, res) => {
  const authUser = jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      return authData;
    }
  });
  const householdId = authUser.user.household_id;
  const householdUsers = await queries.getAllByHouseholdId(householdId);
  if (!householdUsers) {
    res.status(404).send("Users not found");
  }
  res.send(householdUsers.rows);
});

module.exports = {
  allUsernames,
  createNewUser,
  getUserById,
  getUsersByHouseholdId,
};
