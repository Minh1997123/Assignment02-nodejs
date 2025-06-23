const express = require("express");

const userController = require("../controller/user");
const router = express.Router();

// post => login
router.post("/login", userController.postLogin);
// post => sign up
router.post("/sign-up", userController.postSignUp);

module.exports = router;
