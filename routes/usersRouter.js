const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.post("/sign-up", usersController.createNewUser);

usersRouter.get(
  "/usernames",
  usersController.allUsernames,
);
usersRouter.get(
  "/user-by-id/:userId",
  usersController.getUserById,
);
usersRouter.get(
  "/household/all-users",
  usersController.getUsersByHouseholdId,
);

module.exports = usersRouter;
