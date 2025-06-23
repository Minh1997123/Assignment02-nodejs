const userModel = require("../model/user.js");
const transactionModel = require("../model/transaction.js");
const hotelModel = require("../model/hotel.js");
const roomModel = require("../model/room.js");
const hotel = require("../model/hotel.js");
const mongoose = require("mongoose");
// post => admin login
const postAdminLogin = async function (req, res, next) {
  try {
    const reqData = req.body;
    // tim xem co tai khoa n trong database ko
    const user = await userModel.findOne({
      email: reqData.email,
    });
    // neu ko co hoac tai khoan ko phai la admin
    if (!user || !user.isAdmin) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }
    // neu co thi so sanh pass
    if (user.password === reqData.password) {
      return res.status(200).json({ isLogin: true, email: user.email });
    }
    // neu sai pass
    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  } catch (err) {
    return res.status(404).json("err");
  }
};

// get => admin home
const getAdminHome = async function (req, res, next) {
  try {
    // lay toan bo danh sach hoa don
    const transaction = await transactionModel.find();
    // lay toan bo danh sach nguoi dung
    const user = await userModel.find();
    // tinh toan tong doanh thu
    let earnings = 0;
    transaction.map((item) => {
      earnings = earnings + item.price;
    });
    // tinh daonh thu trung binh trong thang
    const balance = earnings / 12;
    // lay nhung hoa don moi nhat
    const newTransaction = transaction.reverse();
    await Promise.all(
      newTransaction.map(async (item) => {
        return item.populate("hotel");
      })
    );

    // gui du lieu moi
    const newdata = {
      users: user.length,
      oders: transaction.length,
      earnings,
      balance,
      transaction: newTransaction,
    };
    res.status(200).json(newdata);
  } catch (err) {
    return res.status(404).json(err);
  }
};

// lay toan bo danh sach khach san
const getAllHotel = async function (req, res, next) {
  const hotels = await hotelModel.find();
  res.status(200).json(hotels);
};

// xao khach san
const deleteHotel = async function (req, res) {
  const hotelId = req.params.hotelId;
  // tim xem hotel co dang trong giao dich nao ko
  const transactions = await transactionModel.find({
    hotel: hotelId,
  });
  // neu co thi gui ve thong bao
  if (transactions.length) {
    return res.status(404).json("hotel dang trong 1 giao dich");
  }
  // neu ko thi xoa hotel khoi co so du lieu
  const hotel = await hotelModel.findByIdAndDelete(hotelId);
  await Promise.all(
    hotel.rooms.map((room) => {
      return roomModel.findByIdAndDelete(room);
    })
  );
  return res.status(200).json(hotel);
};

// ham tao 1 hotel  moi
const postHotel = async function (req, res) {
  const data = req.body;
  // xu ly chuoi photos khi duoc gui len thanh 1 mang
  const photos = data.photos
    .replaceAll(" ", "")
    .replaceAll("https", ",https")
    .split(",");
  const newPhotos = photos.filter((item) => {
    return item;
  });
  // tao hotel moi
  const hotel = await hotelModel.create({
    name: data.name,
    type: data.type,
    city: data.city,
    address: data.address,
    distance: data.distance,
    photos: newPhotos,
    desc: data.description,
    rating: 5,
    featured: data.featured,
    rooms: [],
    title: data.title,
  });
  // lu vao data base
  const newHotel = await hotel.save();
  res.status(200).json(newHotel);
};

// lay toan bo danh sach room
const getRooms = async function (req, res) {
  // lay toan bo danh sach room tu database
  const rooms = await roomModel.find();
  res.status(200).json(rooms);
};
// xoa 1 phong khoi danh sach
// xao khach san
const deleteRoom = async function (req, res) {
  const roomId = req.params.roomId;
  // tim hotel chua room do
  const hotel = await hotelModel.findOne({
    rooms: roomId,
  });
  // tim xem hotel co dang trong giao dich nao ko
  const transactions = await transactionModel.find({
    hotel: hotel._id,
  });
  // neu co thi gui ve thong bao
  if (transactions.length) {
    return res.status(404).json("hotel dang trong 1 giao dich");
  }
  // neu ko thi xoa hotel khoi co so du lieu
  await roomModel.findByIdAndDelete(roomId);
  // xoa loai bo room bi xoa khoi danh sach phong
  hotel.rooms = hotel.rooms.filter((room) => {
    return room.toString() !== roomId;
  });
  // luu lai vao co so du lieu
  await hotel.save();
  return res.status(200).json(hotel);
};

// tao 1 room moi cho hotel
const postRooms = async function (req, res) {
  const data = req.body;
  // su ly chuoi danh sach phong gui len  thanh 1 mang danh sach phong
  const rooms = data.rooms.replaceAll(" ", ",").split(",");
  const newRooms = rooms.filter((item) => {
    return item;
  });
  console.log();
  // tao room moi
  const room = await roomModel.create({
    title: data.title,
    price: Number(data.price),
    maxPeople: Number(data.maxPeople),
    desc: data.description,
    roomNumbers: newRooms,
  });
  // lay hotel cua room
  const hotel = await hotelModel.findById(data.hotel);
  // them room vao danh sach rom cua hotel
  hotel.rooms.push(room._id);
  // luu vao du lieu
  await room.save();
  await hotel.save();
  return res.status(200).json(room);
};

// ham lay toan bo hoa don
const getTransaction = async function (req, res) {
  const transactions = await transactionModel.find();
  await Promise.all(
    transactions.map(async (item) => {
      return item.populate("hotel");
    })
  );
  res.status(200).json(transactions);
};
module.exports = {
  postAdminLogin,
  getAdminHome,
  getAllHotel,
  deleteHotel,
  postHotel,
  getRooms,
  deleteRoom,
  postRooms,
  getTransaction,
};
