const hotel = require("../model/hotel");
const hotelModel = require("../model/hotel");
const { checkFreeRoomHandler } = require("./hepper");
// get => hotel list home
const getHotel = async function (req, res, next) {
  // lay du lieu tu database
  const hotels = await hotelModel.find();
  //   danh sach so luong ca loai khac san
  const typeHotels = [
    {
      count: 0,
      imgUrl: "http://localhost:5000/images/hotel/type_1.jpg",
      type: "hotel",
    },
    {
      count: 0,
      imgUrl: "http://localhost:5000/images/hotel/type_2.jpg",
      type: "apartments",
    },
    {
      count: 0,
      imgUrl: "http://localhost:5000/images/hotel/type_3.jpg",
      type: "resorts",
    },
    {
      count: 0,
      imgUrl: "http://localhost:5000/images/hotel/type_4.jpg",
      type: "villas",
    },
    {
      count: 0,
      imgUrl: "http://localhost:5000/images/hotel/type_5.jpg",
      type: "cabins",
    },
  ];
  //   so luong khach san o cac thanh pho
  const countHotel = [
    {
      count: 0,
      imgUrl: "http://localhost:5000/images/city/Ha Noi.jpg",
      city: "Ha Noi",
    },
    {
      count: 0,
      imgUrl: "http://localhost:5000/images/city/HCM.jpg",
      city: "Ho Chi Minh",
    },
    {
      count: 0,
      imgUrl: "http://localhost:5000/images/city/Da Nang.jpg",
      city: "Da Nang",
    },
  ];

  let topRatingHotel = [];
  //   tinh so luong cac khach san  va ca loai khach san
  hotels.map((hotel) => {
    // so luong khac san
    if (hotel.city === "Ha Noi") {
      countHotel[0].count += 1;
    } else if (hotel.city === "Ho Chi Minh") {
      countHotel[1].count += 1;
    } else if (hotel.city === "Da Nang") {
      countHotel[2].count += 1;
    }
    // so lpuong cac loai khach san
    if (hotel.type === "hotel") {
      typeHotels[0].count += 1;
    } else if (hotel.type === "apartments") {
      typeHotels[1].count += 1;
    } else if (hotel.type === "resorts") {
      typeHotels[2].count += 1;
    } else if (hotel.type === "villas") {
      typeHotels[3].count += 1;
    } else if (hotel.type === "cabins") {
      typeHotels[4].count += 1;
    }
  });
  //   sap xep kkhach san theo rating tu cao den thap
  const newHotels = hotels.sort((a, b) => b.rating - a.rating);
  topRatingHotel = newHotels.splice(0, 3);
  // lay cac phong thuoc khac san
  await Promise.all(
    topRatingHotel.map((hotel) => {
      return hotel.populate("rooms");
    })
  );
  //   lay 3 khac san co rating cao nhat
  const newData = {
    typeHotels,
    countHotel,
    topRatingHotel,
  };
  return res.status(200).json(newData);
};

// get=>detal
const getDetail = async function (req, res, next) {
  const hotelId = req.params.hotelId;
  // lay thong tin hotel tu database
  const hotelDetail = await hotelModel.findOne({
    _id: hotelId,
  });
  // lay thong tin phong cua hotel
  await hotelDetail.populate("rooms");
  // gui thong tin ve
  res.status(200).json(hotelDetail);
};
// lay danh sach hotel theo cac tieu chi chon
const getSearchHotel = async function (req, res, next) {
  // lay danh sach toan bo hotel
  const hotels = await hotelModel.find();
  // neu ko co query thi lay toan bo danh sach hotel gui ve cho trang search
  if (!req.query.date) {
    await Promise.all(
      hotels.map((hotel) => {
        return hotel.populate("rooms");
      })
    );
    return res.status(200).json(hotels);
  }
  // lay du lieu tu query
  const date = JSON.parse(req.query.date);
  // lay danh sach hotel theo city duoc chon
  const hotelInCitys = hotels.filter((hotel) => {
    // tim kiem nhung hotel co ten city chua tu tim kiem
    const isHotel = hotel.city
      .toLocaleLowerCase()
      .search(req.query.city.toLocaleLowerCase());
    // neu co
    if (isHotel !== -1) {
      return hotel;
    }
  });
  //   lay danh sach cac hotel co phong trong trong khoang thoi gian duoc chon
  const freeHotels = await Promise.all(
    hotelInCitys.map(async (hotel) => {
      // lay danh sach cac phong trong
      const { freeRoom } = await checkFreeRoomHandler(hotel._id, date);
      // thay the danh sach phong cua hotel bang danh sach cac phong trong
      hotel.rooms = freeRoom;
      // tra ra hotel
      return hotel;
    })
  );

  // lay danh sach cac hotel co phong trong trong khoang thoi gian duoc chon
  const newFreeHotels = freeHotels.filter((hotel) => {
    if (hotel.rooms.length > 0) {
      return hotel;
    }
  });
  // lay danh sach khach san co so phong phu hop voi so phong da chon
  const listHotel = newFreeHotels.filter((hotel) => {
    // lay danh sach cac phong con trong
    const rooms = hotel.rooms.filter((room) => {
      return room.roomNumbers.length >= Number(req.query.room);
    });
    // neu danh sach phong phu hop voi so phong yeu cau
    if (rooms.length > 0) {
      return hotel;
    }
  });
  res.status(200).json(listHotel);
};
module.exports = {
  getHotel,
  getSearchHotel,
  getDetail,
};
