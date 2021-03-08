const mongoose = require("mongoose");

const schema = {
  index: { type: Number, required: true },
  columnId: { type: mongoose.Schema.Types.ObjectId, ref: "Column" },
  created: { type: Date, default: Date.now() },
  deadline: { type: Date },
  creator: { type: String, required: true },
  owner: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, maxChar: 1000, required: true },
  tags: [{ type: String }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
};

const CardSchema = mongoose.Schema(schema);

const CardModel = mongoose.model("Card", CardSchema);

module.exports = CardModel;
