const express = require("express");

const hotelController = require("../controller/hotel");
const router = express.Router();

// get => hotel
router.get("/hotel", hotelController.getHotel);

// get =>detail
router.get("/detail/:hotelId", hotelController.getDetail);

// get => search hotel
router.get("/search-hotel", hotelController.getSearchHotel);
module.exports = router;
