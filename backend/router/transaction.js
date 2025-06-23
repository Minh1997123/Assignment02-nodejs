const express = require("express");

const transactionController = require("../controller/transaction");
const router = express.Router();

// post =>transaction
router.post("/transaction", transactionController.postTransaction);

// get => transaction
router.get("/transaction", transactionController.getTransaction);

module.exports = router;
