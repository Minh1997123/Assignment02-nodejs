const transactionModel = require("../model/transaction");
const hotelModel = require("../model/hotel");

const { checkFreeRoomHandler } = require("./hepper");

// tao transaction moi
const postTransaction = async function (req, res, next) {
  const reqData = req.body;
  const hotelId = req.query.hotelId;
  //   tao gia tri ngay moi de kiem tra xem phong bi dat chua
  const newDate = {
    startDate: reqData.dateStart,
    endDate: reqData.dateEnd,
  };
  //   kiem tra xem phong chon da bi dat chua
  const rooms = await checkFreeRoomHandler(hotelId, newDate);
  //   danh sach phong dang dc dat
  const newRooms = rooms.useRoom.toString();
  //   kiem tra xem phong dat co trong danh sach ko
  const useRoom = reqData.room.find((item) => {
    if (newRooms.search(item) !== -1) {
      return item;
    }
  });
  //   neu co thi bao loi
  if (useRoom) {
    return res.status(401).json("phong da bi dat");
  }
  const newTransaction = await transactionModel.create({
    user: reqData.user,
    hotel: hotelId,
    room: reqData.room,
    dateStart: reqData.dateStart,
    dateEnd: reqData.dateEnd,
    price: reqData.price,
    payment: reqData.payment,
    status: "Booked",
    phoneNumber: reqData.phoneNumber,
    cardNumber: reqData.cardNumber,
    email: reqData.email,
  });
  const transaction = await newTransaction.save();
  res.status(200).json(transaction);
};

//  lay toan bo transaction cua user
const getTransaction = async function (req, res, next) {
  const userEmail = req.query.userEmail;
  const transactions = await transactionModel.find({
    email: userEmail,
  });
  const newTransactions = await Promise.all(
    transactions.map((item) => {
      return item.populate("hotel");
    })
  );
  res.status(200).json(newTransactions);
};
module.exports = {
  postTransaction,
  getTransaction,
};
