const { Router } = require("express");
const {
  allUsernames,
  createNewUser,
  getUserById,
} = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.post("/sign-up", createNewUser);
usersRouter.get("/usernames", allUsernames);
usersRouter.get("/user-by-id", getUserById);

module.exports = usersRouter;
