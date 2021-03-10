const mongoose = require("mongoose");

const schema = {
  key: { type: String, required: true, lowercase: true },
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  created: { type: Date, default: Date.now },
  title: { type: String, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
};

const ColumnSchema = mongoose.Schema(schema);

const ColumnModel = mongoose.model("Column", ColumnSchema);

module.exports = ColumnModel;
