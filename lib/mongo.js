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
  file: String,
  count: Number,
});

module.exports = {
  DBDoc: mongoose.models.DBDoc || mongoose.model("DBDoc", docSchema),
  DBCounter:
    mongoose.models.DBCounter || mongoose.model("DBCounter", counterSchema),
  Models: mongoose.models,
};

export async function updateCounter(nameCol) {
  // add the counter
  const pCounter =
    (await Models.DBCounter.findOne({ name: nameCol })) ||
    (await new Models.DBCounter({ name: nameCol }).save());
  const counter = pCounter.counter + 1;

  await Models.DBCounter.updateOne({ name: nameCol }, { counter: counter });
  return counter;
}
