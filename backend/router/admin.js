const express = require("express");

const adminController = require("../controller/admin");
const router = express.Router();

// get=>home
router.get("/home", adminController.getAdminHome);
// post => login
router.post("/login", adminController.postAdminLogin);
// get => hotel
router.get("/hotels", adminController.getAllHotel);
// post => hotel
router.post("/hotel", adminController.postHotel);
// delete => hotel
router.delete("/hotel/:hotelId", adminController.deleteHotel);
// get =>room
router.get("/rooms", adminController.getRooms);
// post => room
router.post("/rooms", adminController.postRooms);
// delete => rooms
router.delete("/rooms/:roomId", adminController.deleteRoom);

// get =>Transaction
router.get("/transaction", adminController.getTransaction);
module.exports = router;
