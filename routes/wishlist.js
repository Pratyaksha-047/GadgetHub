const express = require("express")
const router = express.Router()

const User = require('../models/user');
const gadget = require('../models/gadget');

const { getwishlist, addgadget } = require('../controller/wishlist');
const { requireSignin } = require("../common-middleware");

router.get('/getwishlist', requireSignin, getwishlist);

router.post('/addprodwishlist', requireSignin, addgadget);//test

//delete product from wishlist

module.exports = router;