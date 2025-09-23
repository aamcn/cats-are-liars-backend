const { Router } = require("express");
const feedHistoryController = require("../controllers/feedHistoryController");
const feedHistoryRouter = Router();

//GET Routes

//Get all feed entries.
feedHistoryRouter.get("/all", feedHistoryController.getAllFeedEntries);
//Get feed entry by entryId in params.
feedHistoryRouter.get(
  "/entry-id/:entryId/get/",
  feedHistoryController.getFeedEntryByID,
);
//Get all feed entries by cats name in params.
feedHistoryRouter.get(
  "/cat-name/:catName/get/",
  feedHistoryController.getEntriesByCatName,
);
//Get all feed entries by year.
feedHistoryRouter.get("/all/year", feedHistoryController.getEntriesByYear);

//POST routes

//Add new feeding entry to the database
feedHistoryRouter.post(
  "/submit-feeding",
  feedHistoryController.addFeedingEntry,
);
//Delete a feeding entry by entryId.
feedHistoryRouter.post(
  "/delete-feeding",
  feedHistoryController.deleteEntryById,
);
//Get all feed entries between two dates.
feedHistoryRouter.post(
  "/between-dates",
  feedHistoryController.getAllBetweenDates,
);
//Get all feed entries by month and year.
feedHistoryRouter.post(
  "/all/month-year",
  feedHistoryController.getEntriesByMonthYear,
);

module.exports = feedHistoryRouter;
