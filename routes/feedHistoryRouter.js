const { Router } = require("express");
const feedHistoryController = require("../controllers/feedHistoryController");
const feedHistoryRouter = Router();

feedHistoryRouter.get(
  "/all",
  feedHistoryController.getAllFeedEntries,
);
feedHistoryRouter.get(
  "/entry-id/:entryId/get/",
  feedHistoryController.getFeedEntryByID,
);
feedHistoryRouter.get(
  "/cat-name/:catName/get/",
  feedHistoryController.getEntriesByCatName,
);

feedHistoryRouter.get(
  "/all/year",
  feedHistoryController.getEntriesByYear,
);

feedHistoryRouter.post(
  "/submit-feeding",
  feedHistoryController.addFeedingEntry,
);
feedHistoryRouter.post(
  "/delete-feeding",
  feedHistoryController.deleteEntryById,
);

feedHistoryRouter.post(
  "/between-dates",
  feedHistoryController.getAllBetweenDates,
);

feedHistoryRouter.post(
  "/all/month-year",
  feedHistoryController.getEntriesByMonthYear,
);


module.exports = feedHistoryRouter;
