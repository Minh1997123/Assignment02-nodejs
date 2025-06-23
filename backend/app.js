const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const hotelRouter = require("./router/hotel");
const userRouter = require("./router/user");
const roomRouter = require("./router/room");
const adminRouter = require("./router/admin");
const transactionRouter = require("./router/transaction");
// const mongodb = require("./datas/database");

const app = express();

app.use(cors());
// dọc dữ liệu kiểu json
app.use(express.json());

// api lay anh
// city
app.use(
  "/images/city",
  express.static(path.join(__dirname, "images", "City Image"))
);
// hotel
app.use(
  "/images/hotel",
  express.static(path.join(__dirname, "images", "hotel image"))
);
// user
app.use(userRouter);
// hotel
app.use(hotelRouter);
// room
app.use(roomRouter);
// transactionRouter
app.use(transactionRouter);
// admin
app.use("/admin", adminRouter);

const urlDb = `mongodb+srv://minhncfx20455:XhzTflYc2PxvSjcf@cluster0.qr483ce.mongodb.net/hotels`;
mongoose
  .connect(urlDb)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
