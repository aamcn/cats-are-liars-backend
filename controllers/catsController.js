const queries = require("../db/catsQueries")


async function addCatToTable(req, res, next) {
   const catName = req.body.newCatName
   const catMeals = req.body.newCatMeals
   const catMedication = req.body.newCatMedication
   try{
      await queries.addCatToTable(catName, catMeals, catMedication)
      res.send('success')
       } catch(err) {
           return next(err)
       }
 }

async function updateCatDetails(req, res, next) {
   const catName = req.body.newName
   const catMeals = req.body.newMeals
   const catMedication = req.body.newMedication
   const catId = req.params.catId
   try{
      await queries.updateCat(catName, catMeals, catMedication, catId)
      res.send('success')
       } catch(err) {
           return next(err)
       }
}

async function getAllCats(req, res) {
   const cats =  await queries.allCats();
   console.log(cats.rows)
   res.send(cats.rows)

} 

async function getCatByName(req, res) {
   const catName = req.params.name
   const catQuery = await queries.catByName(catName)
   console.log(catQuery.rows)
   res.send(catQuery.rows)
}

async function getCatByCatId(req, res) {
    const catId = req.params.catId
    const catQueryId = await queries.catByCatId(catId)
    console.log(catQueryId.rows)
    res.send(catQueryId.rows)
 }

module.exports = { addCatToTable, getAllCats, getCatByName, getCatByCatId, updateCatDetails}