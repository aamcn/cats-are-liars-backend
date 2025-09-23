const express = require("express");


const messagesController = require("../controllers/messagesController.js");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

const messagesRouter = express.Router();

messagesRouter.get("/public", messagesController.getPublicMessage);

messagesRouter.get("/protected", validateAccessToken, messagesController.getProtectedMessage);

messagesRouter.get("/admin", validateAccessToken, messagesController.getAdminMessage);

module.exports =  messagesRouter ;