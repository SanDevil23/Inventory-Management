const express = require('express');
const { addCustomer, getCustomers, findCustomer } = require('../controllers/customerControllers');
const router = express.Router();

router.route("/add").post(addCustomer);
router.get("/data", getCustomers);
router.get("/find", findCustomer);



module.exports = router;