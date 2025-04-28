const queries = require("../db/feedHistoryQueries.js");
const asyncHandler = require("express-async-handler");

const getAllFeedEntries = asyncHandler(async (req, res) => {
  const history = await queries.allEntries();
  if (!history) {
    res.status(404).send("History not found");
    return;
  }
  res.send(history.rows);
});

const getFeedEntryByID = asyncHandler(async (req, res) => {
  const entryId = req.params.entryId;
  const feedEntries = await queries.entryById(entryId);
  if (!feedEntries) {
    res.status(404).send("No entries found");
    return;
  }
  res.send(feedEntries.rows);
});

const getEntriesByCatName = asyncHandler(async (req, res) => {
  const catName = req.params.catName;
  const feedEntries = await queries.entriesByCatName(catName);
  if (!feedEntries) {
    res.status(404).send("No entries found");
    return;
  }
  res.send(feedEntries.rows);
});

const addFeedingEntry = asyncHandler(async (req, res) => {
    const entry = req.body
    const t = await queries.insertFeedingEntry(entry)
    res.send('Entry sent')
})

const deleteEntryById = asyncHandler(async(req, res) => {
    const entryId = req.body.entryId
    await queries.deleteEntryById(entryId)
    res.send('Entry Deleted')
})

module.exports = { getAllFeedEntries, getFeedEntryByID, getEntriesByCatName, addFeedingEntry, deleteEntryById};
