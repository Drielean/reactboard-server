const mongoose = require("mongoose");

const schema = {
  title: { type: String, required: true },
  created: { type: Date, default: Date.now() },
  columns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Column" }],
};

const BoardSchema = mongoose.Schema(schema);

const BoardModel = mongoose.model("Board", BoardSchema);

module.exports = BoardModel;
