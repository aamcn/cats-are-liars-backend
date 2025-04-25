
const queries = require("../db/feedHistoryQueries.js")


async function getAllFeedEntries(req, res) {
    const history =  await queries.getAllEntries();
    res.send(history.rows)
 } 


module.exports = { getAllFeedEntries }
