var express = require("express");
var router = express.Router();
const { DBDoc } = require("../lib/mongo");
var models = require("../lib/mongo");
const multer = require("multer");

const isProduction = process.env.NODE_ENV === "production";
const basepathSaveDoc = isProduction
  ? "/var/www/docs/"
  : "/home/elhassen/Downloads/docs/";

console.log(isProduction);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, basepathSaveDoc);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    console.log(file.fieldname, file.filename, file.originalname);
    //  + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
/* GET home page. */
/* GET home page. */
router.get("/", async function (req, res, next) {
  const docs = await models.DBDoc.find({});
  res.send("hello to pcex");
});

router.get("/docs", async function (req, res, next) {
  const docs = await models.DBDoc.find({});
  res.send(docs);
});

router.post("/save", upload.single("file"), async function (req, res, next) {
  console.log(req.body);
  res.send("hello to pcex");
});

module.exports = router;
