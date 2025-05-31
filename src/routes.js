// Call Your Routes
const { userRouter } = require("./services/auth/Routes");
const { favoriteRouter } = require("./services/favorite/Routes");
const { noteRouter } = require("./services/note/Routes");
const { paymentRouter } = require("./services/payment/Routes");
const ExpressApp = require("express")();

/**
 * 
 * @param {ExpressApp} app 
 */
module.exports = (app) => {
    /* Define Your Routes */
    app.use('/user', userRouter)
    app.use('/app', paymentRouter)
    app.use('/document', noteRouter)
    app.use('/document', favoriteRouter)
}