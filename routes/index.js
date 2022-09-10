var express = require("express");
var router = express.Router();
const { DBDoc } = require("../lib/mongo");

/* GET home page. */
router.get("/docs", async function (req, res, next) {
  const docs = await DBDoc.find({});
  res.send(docs);
});

module.exports = router;
