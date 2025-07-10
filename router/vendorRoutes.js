
//By using the Router() in-built function in express, we can define the routing paths for controller functions

const express = require("express")

const router = express.Router()

const vendorController = require("../controller/vendorController")

//As we are performing insert operation via vendorRegister function, so we can define the path for these function by using router.post() method

router.post('/register', vendorController.vendorRegister)
//Lets define the routing path to activate the vendorLogin function
router.post('/login', vendorController.vendorLogin);

//Lets define the routing path to activate the getAllVendors function, here we are getting all the records from vendors table so we hav eto define the path by using router.get() 
router.get('/allvendors', vendorController.getAllVendors);

router.get('/single-vendor/:id', vendorController.getVendorById);
//Lets export these router, to use these in other code files

module.exports = router;