const express = require("express");
const messagesController = require("../controllers/messagesController.js");
const { jwtCheck } = require("../verify/jwtCheck.js");
const messagesRouter = express.Router();

messagesRouter.get("/public", messagesController.getPublicMessage);

messagesRouter.get(
  "/protected",
  jwtCheck,
  messagesController.getProtectedMessage,
);

messagesRouter.get("/admin", jwtCheck, messagesController.getAdminMessage);

module.exports = messagesRouter;
