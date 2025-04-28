const { Router } = require("express");
const verifyToken = require("../verifyToken")


const {
  allUsernames,
  createNewUser,
  getUserById,
} = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.post("/sign-up", createNewUser);
usersRouter.get("/usernames",  verifyToken.verifyToken,  allUsernames);
usersRouter.get("/user-by-id", verifyToken.verifyToken,  getUserById);

module.exports = usersRouter;

