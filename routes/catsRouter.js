const { Router } = require("express");
const catsController = require("../controllers/catsController");
const catsRouter = Router();

catsRouter.get("/", catsController.getAllCats);

//GET Routes

//Get cat by name in params.
catsRouter.get("/cat-name/:name", catsController.getCatByName);
//Get cat by catId in params.
catsRouter.get("/cat-id/:catId", catsController.getCatByCatId);

//POST routes

//Add new cat to the database
catsRouter.post("/add-new-cat", catsController.addCatToTable);
//Update cat details, by catId in params.
catsRouter.post("/cat-id/:catId/update/", catsController.updateCatDetails);
//Add a feeder to a cat.
catsRouter.post("/add-feeder", catsController.addCatFeederById);

module.exports = catsRouter;
