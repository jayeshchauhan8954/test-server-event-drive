const express = require('express');
const { register, login, logout } = require('./Controller');
const { verifyJwtToken } = require('@src/middlewares/jwt');
const { UserValSchema } = require('./validations');
const userRouter = express.Router();


userRouter.post('/register', UserValSchema('register'), register)

userRouter.post('/login', UserValSchema('login'), login)

userRouter.post('/logout', verifyJwtToken, logout)

module.exports = { userRouter }