// import modules
const express = require("express");
const app = express();
const apiRouterV1 = express.Router()
const morgan = require("morgan");
const cors = require('cors');
const helmet = require("helmet");
const bodyParser = require("body-parser");
const http = require('http');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const { PORT, API_VERSION } = require("./config/index");

// Path Alias
require('module-alias/register')

// configs
require('./config/database')

const { handleCatchError, handleRouteNotFound, handlePagination } = require("@src/middlewares/express_app");
const { combinedLogStream } = require("@config/logger");


// application level middlewares
app.use(helmet())
app.use(cors());
// app.use(morgan('dev'));
app.use(morgan('combined', { stream: combinedLogStream }));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(compression());
app.use(handlePagination)
app.use(cookieParser());
app.disable('x-powered-by')
app.use(API_VERSION, apiRouterV1)


// server status
app.get('/', (req, res) => {
    res.send(`<div align="center" style=""><h1> PaySpaze API Server Ready For Requests. <h1><div>`);
});

// Routes permissions
require("./src/routes")(apiRouterV1)

/* Handle errors */
app.use(handleCatchError)
app.all("*", handleRouteNotFound)

// Listener server
app.listen(PORT, async () => {
    console.log("Payspaze server is running on PORT:", PORT);
})  
