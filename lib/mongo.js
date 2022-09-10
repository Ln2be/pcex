var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// const isProduction = process.env.NODE_ENV === "production";

// const db = isProduction ? "iqardb" : "iqardb3";

mongoose.connect("mongodb://localhost:27017/pcdb");

const counterSchema = new Schema({
  name: String,
  counter: { default: 0, type: Number },
});

const docSchema = new Schema({
  name: String,
  tel: String,
  field: String,
  chapter: String,
  kind: String,
  files: [String],
  count: Number,
});

module.exports = {
  DBDoc: mongoose.models.DBDoc || mongoose.model("DBDoc", docSchema),
  DBCounter:
    mongoose.models.DBCounter || mongoose.model("DBCounter", counterSchema),
  Models: mongoose.models,
};
