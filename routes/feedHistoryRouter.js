const { Router } = require("express");
const feedHistoryController = require("../controllers/feedHistoryController");
const feedHistoryRouter = Router();
const verifyToken = require("../verifyToken");

feedHistoryRouter.get(
  "/all",
  verifyToken.verifyToken,
  feedHistoryController.getAllFeedEntries,
);
feedHistoryRouter.get(
  "/entry-id/:entryId/get/",
  verifyToken.verifyToken,
  feedHistoryController.getFeedEntryByID,
);
feedHistoryRouter.get(
  "/cat-name/:catName/get/",
  verifyToken.verifyToken,
  feedHistoryController.getEntriesByCatName,
);

feedHistoryRouter.get(
  "/all/year",
  verifyToken.verifyToken,
  feedHistoryController.getEntriesByYear,
);

feedHistoryRouter.post(
  "/submit-feeding",
  verifyToken.verifyToken,
  feedHistoryController.addFeedingEntry,
);
feedHistoryRouter.post(
  "/delete-feeding",
  verifyToken.verifyToken,
  feedHistoryController.deleteEntryById,
);

feedHistoryRouter.post(
  "/between-dates",
  verifyToken.verifyToken,
  feedHistoryController.getAllBetweenDates,
);

feedHistoryRouter.post(
  "/all/month-year",
  verifyToken.verifyToken,
  feedHistoryController.getEntriesByMonthYear,
);


module.exports = feedHistoryRouter;
