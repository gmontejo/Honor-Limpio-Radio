const mongoose = require("mongoose");

const { Schema } = mongoose;

const FlyerSchema = new Schema(
  {
    file: { type: Buffer, required: true },
  },
  { strict: true }
);

module.exports = mongoose.model("Flyer", FlyerSchema);
