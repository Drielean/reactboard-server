const mongoose = require("mongoose");

const schema = {
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
};

const UserSchema = mongoose.Schema(schema);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
