const express = require("express")
const router = express.Router()
const { signup, signin, requireSignin } = require('../../controller/admin/auth')
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const User = require('../../models/user');

router.post('/admin/signin', validateSignupRequest, isRequestValidated, signin)

router.post('/admin/signup', validateSigninRequest, isRequestValidated, signup)




module.exports = router;