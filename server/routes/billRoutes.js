const express = require('express');
const { addBill, getBill } = require('../controllers/billControllers');
const router = express.Router();

router.post("/add", addBill);
router.get("/data", getBill);


module.exports = router;