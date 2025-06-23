const roomModel = require("../model/room");

const { checkFreeRoomHandler } = require("./hepper");
// lay phong theo hotel va ngay duoc chon
const getRoom = async function (req, res, next) {
  // lay hotelId va data tu body va qurery
  const hotelId = req.query.hotelId;
  const dateRange = JSON.parse(req.query.dateRange);
  // tao thong tin phong moi sau khi kiem tra phong nao trong
  const rooms = await checkFreeRoomHandler(hotelId, dateRange);
  const newRooms = rooms.freeRoom;
  res.status(200).json(newRooms);
};

module.exports = {
  getRoom,
};
