const express = require('express');
const { addItems, getItems, findItem } = require('../controllers/itemController');
const router = express.Router();

router.post("/add", addItems);
router.get("/data", getItems);
router.get("/find", findItem);



module.exports = router;