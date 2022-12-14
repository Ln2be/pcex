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
let filefullname = "";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, basepathSaveDoc);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    console.log(file.fieldname, file.filename, file.originalname);
    //  + "-" + Math.round(Math.random() * 1e9);
    filefullname = uniqueSuffix + "-" + file.originalname;
    cb(null, filefullname);
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
  const doc = req.body;
  doc.file = filefullname;
  const counter = await updateCounter("docs");
  doc.count = counter;
  await new models.DBDoc(doc).save();
  res.send("hello to pcex");
});

router.get("/delete", async function (req, res, next) {
  const count = req.query.count;
  const docs = await models.DBDoc.deleteOne({ count: count });
  res.send(docs);
});

router.get("/deleteall", async function (req, res, next) {
  const docs = await models.DBDoc.deleteMany({});
  res.send(docs);
});

module.exports = router;

async function updateCounter(nameCol) {
  // add the counter
  const pCounter =
    (await models.DBCounter.findOne({ name: nameCol })) ||
    (await new models.DBCounter({ name: nameCol }).save());
  const counter = pCounter.counter + 1;

  console.log(pCounter.counter, counter);
  await models.DBCounter.updateOne({ name: nameCol }, { counter: counter });
  return counter;
}
