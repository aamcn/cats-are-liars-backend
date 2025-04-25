const { Router } = require("express");
const feedHistoryController = require("../controllers/feedHistoryController")
const feedHistoryRouter = Router();


feedHistoryRouter.get("/all", feedHistoryController.getAllFeedEntries);
feedHistoryRouter.get("/entry-id/:entryId/get/", feedHistoryController.getFeedEntryByID);
feedHistoryRouter.get("/cat-name/:catName/get/", feedHistoryController.getEntriesByCatName);


module.exports = feedHistoryRouter;  