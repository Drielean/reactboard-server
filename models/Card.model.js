const mongoose = require("mongoose");

const schema = {
  columnId: { type: mongoose.Schema.Types.ObjectId, ref: "Column" },
  created: { type: Date, default: Date.now },
  deadline: { type: Date },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  creator: { type: String, required: true },
  owner: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, maxChar: 1000, required: true },
  priority: { type: Number, default: 1, enum: [1, 2, 3] },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
};

const CardSchema = mongoose.Schema(schema);

const CardModel = mongoose.model("Card", CardSchema);

module.exports = CardModel;
