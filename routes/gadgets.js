const express = require("express")
const router = express.Router()
const MobileData = require('../models/mobile_data');
const TVData = require('../models/tablet_data');
const CameraData = require("../models/desktop_data")
const LaptopData = require("../models/laptop_data")
const Gadget = require("../models/gadget");
const Gadreview = require("../models/gadget_review")
const { requireSignin, adminMiddleware } = require("../common-middleware");
const sdk = require('api')('@techspecs/v4.0#erb0ilg40hsj5');
const env = require('dotenv');

//tablets, mobiles, laptop, desktops

const { add_mobile, add_tablet, getallproducts, getallmobiles, getalldesktops, getalltablets, getalllaptops, getallbrands, getproductsbybrand, getproduct, getproductcompare } = require('../controller/gadget')

router.post('/addmobile', requireSignin, adminMiddleware, add_mobile);

router.post('/addtablet', requireSignin, adminMiddleware, add_tablet);

router.get('/getallgadgets', getallproducts)//pagination

router.get('/getallmobiles', getallmobiles)

router.get('/getalltablets', getalltablets)

router.get('/getalllaptops', getalllaptops)

router.get('/getalldesktops', getalldesktops)

router.get('/getallbrands', getallbrands)

router.get('/getproductsbybrand', getproductsbybrand)

router.get('/getproduct', getproduct)//test

router.post('/getproductcompare', getproductcompare)//test
//gadget finder

//update

env.config();

router.post('/product/details', async (req, res) => {
    const { productId } = req.body;

    sdk.productDetail({
        productId: productId,
        'accept-encoding': '',
        authorization: process.env.TECHSPEC_AUTHORIZATION
    })
        .then( data => {
            return res.send(data);
        })
        .catch(err => console.error(err));
});


module.exports = router;