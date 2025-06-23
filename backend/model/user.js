const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
  },
});

// userSchema.methods.addCart = function () {};

module.exports = mongoose.model("user", userSchema);
