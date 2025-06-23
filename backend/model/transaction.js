const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// tao model cho Transaction
const transactionSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "list_hotel",
  },
  room: {
    type: [Number],
  },
  dateStart: {
    type: String,
    required: true,
  },
  dateEnd: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  payment: { type: String, required: true, enum: ["Credit", "Card", "Cash"] },
  status: {
    type: String,
    required: true,
    emum: ["Booked", "Checkin", "Checkout"],
  },
  phoneNumber: { type: Number },
  cardNumber: { type: Number },
});

module.exports = mongoose.model("transaction", transactionSchema);
