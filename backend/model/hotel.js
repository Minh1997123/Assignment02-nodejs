const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// tao model cho Room
const HotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Hotel", "Apartments", "Resorts", "Villas", "Cabins"],
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  distance: {
    type: Number,
  },
  photos: {
    type: [String],
  },
  desc: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  title: {
    type: String,
  },
  featured: {
    type: Boolean,
  },
  rooms: {
    type: [{ type: Schema.Types.ObjectId, ref: "room" }],
  },
});

module.exports = mongoose.model("list_hotel", HotelSchema);
