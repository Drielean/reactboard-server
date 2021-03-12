const mongoose = require("mongoose");

const schema = {
  title: { type: String, required: true },
  created: { type: Date, default: Date.now },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  creator: { type: String, required: true },
  columns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Column" }],
};

const BoardSchema = mongoose.Schema(schema);

const BoardModel = mongoose.model("Board", BoardSchema);

module.exports = BoardModel;
