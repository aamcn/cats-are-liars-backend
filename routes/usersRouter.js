const { Router } = require("express");
const verifyToken = require("../verifyToken")
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.post("/sign-up", usersController.createNewUser);

usersRouter.get("/usernames",  verifyToken.verifyToken,  usersController.allUsernames);
usersRouter.get("/user-by-id", verifyToken.verifyToken,  usersController.getUserById);

module.exports = usersRouter;

