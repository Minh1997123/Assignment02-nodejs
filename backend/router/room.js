const express = require("express");

const roomController = require("../controller/room.js");
const router = express.Router();

// get =>room
router.get("/room", roomController.getRoom);

module.exports = router;
