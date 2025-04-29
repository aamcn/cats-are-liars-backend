const queries = require("../db/catsQueries");
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');



async function addCatToTable(req, res, next) {
  const authUser = jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      return authData
    }
  })
  const userId = authUser.user.id
  const catName = req.body.newCatName;
  const catMeals = req.body.newCatMeals;
  const catMedication = req.body.newCatMedication;
  try {
    await queries.addCatToTable(catName, catMeals, catMedication, userId);
    res.send("success");
  } catch (err) {
    return next(err);
  }
}



async function updateCatDetails(req, res, next) {
  const authUser = jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      return authData
    }
  })
  const userId = authUser.user.id
  const catName = req.body.newName;
  const catMeals = req.body.newMeals;
  const catMedication = req.body.newMedication;
  const catId = req.params.catId;

  try {
    await queries.updateCat(catName, catMeals, catMedication, catId, userId);
    res.send("success");
  } catch (err) {
    return next(err);
  }
}



async function addCatFeederById(req, res) {
  const authUser = jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      return authData
    }
  })
  const userId = authUser.user.id
  const newFeederId = req.body.newFeederId
  const catId = req.body.catId;
  await queries.addCatFeeder(newFeederId, catId, userId);
  res.send("update");
}


async function getAllCats(req, res) {
  const authUser = jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      return authData
    }
  })
  const userId = authUser.user.id
  const cats = await queries.allCats(userId);
  res.send(cats.rows);
}

async function getCatByName(req, res) {
  const authUser = jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      return authData
    }
  })
  const catName = req.params.name;
  const userId = authUser.user.id
  const catQuery = await queries.catByName(catName, userId);
  res.send(catQuery.rows);
}

async function getCatByCatId(req, res) {
  const authUser = jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      return authData
    }
  })
  const userId = authUser.user.id
  const catId = req.params.catId;
  const catQueryId = await queries.catByCatId(catId, userId);
  res.send(catQueryId.rows);
}

module.exports = {
  addCatToTable,
  getAllCats,
  getCatByName,
  getCatByCatId,
  updateCatDetails,
  addCatFeederById,
};
