const mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: String, required: true },
  description:{ type: String, required: true }
});

module.exports = mongoose.model("Event", eventSchema);
