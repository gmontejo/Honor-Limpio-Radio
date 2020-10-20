const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    posts: { type: Array, required: true },
  },
  { strict: false }
);

module.exports = mongoose.model("User", UserSchema);
