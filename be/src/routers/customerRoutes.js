const express = require("express");
const { createCustomer, getCustomers, editCustomer, getCustomerById, deleteCustomer, editCustomerAddress } = require("../controllers/customerController");
const router = express.Router();

router.post("/create-customer", createCustomer);

router.get("/create-customer/:userId", getCustomers);

router.put("/edit-customer/:id/:userId", editCustomer);
router.put('/editcustomer/:id/:userId', editCustomerAddress);
router.get("/customers/:userId", getCustomerById);
router.delete("/delete-customer/:id", deleteCustomer); 

module.exports = router;