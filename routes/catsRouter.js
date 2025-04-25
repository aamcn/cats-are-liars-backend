const { Router } = require("express");
const catsController = require("../controllers/catsController")
const catsRouter = Router();

catsRouter.get("/", catsController.getAllCats);
catsRouter.get("/cat-name/:name", catsController.getCatByName);
catsRouter.get("/cat-id/:catId", catsController.getCatByCatId);
catsRouter.post("/add-new-cat", catsController.addCatToTable)
catsRouter.post("/cat-id/:catId/update/", catsController.updateCatDetails)
catsRouter.post("/add-feeder", catsController.addCatFeederById)

module.exports = catsRouter;  