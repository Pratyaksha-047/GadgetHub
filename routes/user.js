const express = require("express")
const router = express.Router()
const { signup, signin} = require('../controller/auth')
const User = require('../models/user');
const {} = require('express-validator')
const { validateSignupRequest, isRequestValidated, validateSigninRequest} = require('../validators/auth');
const {profile, updatecontact, updatepassword, addgadgetreview, addcomparereview} = require('../controller/user');
const { requireSignin} = require("../common-middleware");

router.post('/signin', validateSigninRequest, isRequestValidated, signin)

router.post('/signup', validateSignupRequest, isRequestValidated, signup)

router.post('/profile', requireSignin, profile)

router.post('/updatecontact', requireSignin, updatecontact)

router.post('/updatepassword', requireSignin, updatepassword)

router.post('/addgadgetreview', requireSignin, addgadgetreview)//test

router.post('/addcomparereview', requireSignin, addcomparereview)//tes//removed

module.exports = router;