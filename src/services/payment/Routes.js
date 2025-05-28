const express = require('express');
const { paymentFun } = require('./Controller');
const { verifyJwtToken } = require('@src/middlewares/jwt');
const { paymentValSchema } = require('./validations');
const paymentRouter = express.Router();

paymentRouter.post('/payment', verifyJwtToken, paymentValSchema('payment'), paymentFun)

module.exports = { paymentRouter }