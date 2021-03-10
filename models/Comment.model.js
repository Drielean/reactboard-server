const mongoose = require("mongoose");

const schema = {
  created: { type: Date, default: Date.now },
  creator: { type: String, required: true },
  text: { type: String, maxChar: 500, required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
};

const CommentSchema = mongoose.Schema(schema);

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
