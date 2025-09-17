const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

//GET Routes

//Get all usernames in the database.
usersRouter.get("/usernames", usersController.allUsernames);
//Get user by userId in params.
usersRouter.get("/user-by-id/:userId", usersController.getUserById);

//Get all users by householdId.
usersRouter.get("/household/all-users", usersController.getUsersByHouseholdId);

//POST routes

//Create a new user in the database.
usersRouter.post("/sign-up", usersController.createNewUser);

module.exports = usersRouter;
