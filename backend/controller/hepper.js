const room = require("../model/room");
const transactionModel = require("../model/transaction");
const hotelModel = require("../model/hotel");

// ham kiem tra xem phong nao con trong trong khoang thoi gian duoc chon
const checkFreeRoomHandler = async function (hotelId, data) {
  // lay taon bo hoa don cua khach san
  const transactions = await transactionModel.find({
    hotel: hotelId,
  });
  // lay thong tin khach san
  const hotel = await hotelModel.findOne({
    _id: hotelId,
  });
  // tao ngay duoc chon de so sanh
  const dateStart = new Date(data.startDate);
  const dateEnd = new Date(data.endDate);
  // kiem tra nhung phong da duoc dat trong khoang thoi gian duoc chon
  let useRoom = [];
  transactions.map((item) => {
    // tao ngay trong hoa don  de so sanh
    const dateStartItem = new Date(item.dateStart);
    const dateEndItem = new Date(item.dateEnd);
    // ngay bat dau trong khoang chon
    const isDateStart = dateStartItem >= dateStart && dateStartItem <= dateEnd;
    // ngay ket thuc trong khoang chon
    const isDateEnd = dateEndItem >= dateStart && dateEndItem <= dateEnd;
    // thoi gian dat chua khoang chon
    const isDate = dateStartItem < dateStart && dateEndItem > dateEnd;
    // xem ngay bat dau cua hoa don trong khoang thoi gian duoc chon
    if (isDateStart || isDateEnd || isDate) {
      return (useRoom = [...useRoom, ...item.room]);
    }
  });
  //   lay thong tin room cua hotel
  await hotel.populate("rooms");
  // tao danh sach phong moi
  const newRooms = hotel.rooms.map((room) => {
    // lay danh sach cac phong chua duoc dat
    const newRoomNumbers = room.roomNumbers.filter((number) => {
      // kiem tra xem so phong dang chon co trong danh sach phong da dat
      const isFreeRoom = useRoom.find((item) => item === number);
      //   neu ko co thi tra ra so phong
      if (!isFreeRoom) {
        return number;
      }
    });
    // thay doi danh sach so phong moi
    room.roomNumbers = newRoomNumbers;
    // tra ra phong moi
    return room;
  });
  // tra ra danh sach phong sau khi kiem tra
  return {
    useRoom: useRoom,
    freeRoom: newRooms,
  };
};

module.exports = {
  checkFreeRoomHandler,
};
