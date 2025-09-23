const queries = require("../db/feedHistoryQueries.js");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const getAllFeedEntries = asyncHandler(async (req, res) => {
  const authUser = jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      return authData;
    }
  });
  const userId = authUser.user.id;
  const history = await queries.allEntries(userId);
  if (!history) {
    res.status(404).send("Entries not found");
    return;
  }
  res.send(history.rows);
});

const getAllBetweenDates = asyncHandler(async (req, res) => {
  const authUser = jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      return authData;
    }
  });
  const userId = authUser.user.id;
  const fromDate = req.body.dates.fromDate;
  const toDate = req.body.dates.toDate;
  const entries = await queries.allEntriesBetweenDates(
    fromDate,
    toDate,
    userId,
  );
  if (!entries) {
    res.status(404).send("Entries not found");
    return;
  }
  res.send(entries.rows);
});

const getEntriesByMonthYear = asyncHandler(async (req, res) => {
  const authUser = jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      return authData;
    }
  });
  const userId = authUser.user.id;
  const year = req.body.date.year;
  const month = req.body.date.month;
  const history = await queries.allByMonthYear(month, year, userId);
  if (!history) {
    res.status(404).send("History not found");
    return;
  }
  res.send(history.rows);
});

const getEntriesByYear = asyncHandler(async (req, res) => {
  const authUser = jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      return authData;
    }
  });
  const userId = authUser.user.id;
  const year = req.body.year;

  const history = await queries.allByYear(year, userId);
  if (!history) {
    res.status(404).send("History not found");
    return;
  }
  res.send(history.rows);
});

const getFeedEntryByID = asyncHandler(async (req, res) => {
  const authUser = jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      return authData;
    }
  });
  const userId = authUser.user.id;
  const entryId = req.params.entryId;
  const feedEntries = await queries.entryById(entryId, userId);
  if (!feedEntries) {
    res.status(404).send("No entries found");
    return;
  }
  res.send(feedEntries.rows);
});

const getEntriesByCatName = asyncHandler(async (req, res) => {
  const authUser = jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      return authData;
    }
  });
  const userId = authUser.user.id;
  const catName = req.params.catName;
  const feedEntries = await queries.entriesByCatName(catName, userId);
  if (!feedEntries) {
    res.status(404).send("No entries found");
    return;
  }
  res.send(feedEntries.rows);
});

const addFeedingEntry = asyncHandler(async (req, res) => {
  const authUser = jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      return authData;
    }
  });
  const user = authUser.user;
  const entry = req.body.body;
  console.log(entry);
  await queries.insertFeedingEntry(entry, user);
  res.send("Entry sent");
});

const deleteEntryById = asyncHandler(async (req, res) => {
  const authUser = jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      return authData;
    }
  });
  const userId = authUser.user.id;
  const entryId = req.body.entryId;
  await queries.deleteEntryById(entryId, userId);
  res.send("Entry Deleted");
});

module.exports = {
  getAllFeedEntries,
  getFeedEntryByID,
  getEntriesByCatName,
  addFeedingEntry,
  deleteEntryById,
  getEntriesByMonthYear,
  getEntriesByYear,
  getAllBetweenDates,
};
