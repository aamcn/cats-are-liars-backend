const { Router } = require("express");
const feedHistoryController = require("../controllers/feedHistoryController")
const feedHistoryRouter = Router();


feedHistoryRouter.get("/all", feedHistoryController.getAllFeedEntries);


module.exports = feedHistoryRouter;  