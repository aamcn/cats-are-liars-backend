const { Router } = require("express");
const catsController = require("../controllers/catsController");
const catsRouter = Router();
const verifyToken = require("../verifyToken")

catsRouter.get("/", verifyToken.verifyToken, catsController.getAllCats);
catsRouter.get("/cat-name/:name", verifyToken.verifyToken, catsController.getCatByName);
catsRouter.get("/cat-id/:catId", verifyToken.verifyToken, catsController.getCatByCatId);

catsRouter.post("/add-new-cat", verifyToken.verifyToken, catsController.addCatToTable);
catsRouter.post("/cat-id/:catId/update/", verifyToken.verifyToken, catsController.updateCatDetails);
catsRouter.post("/add-feeder", verifyToken.verifyToken, catsController.addCatFeederById);

module.exports = catsRouter;
