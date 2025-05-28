const { PORT = 5005 } = require('../../../config/index');

const options = {
    language: null,
    disableLogs: false,
    disableWarnings: false,
    openapi: null,
    autoHeaders: false,
    autoQuery: true,
    autoBody: true,
    autoResponse: true,
    sortParameters: 'normal',
    sanitizeOutputData: false,
    writeOutputFile: true
};

const swaggerAutogen = require('swagger-autogen')(options);
const doc = {
    info: {
        version: 'v1.0.0',
        title: 'payspaze.com',
        description: 'payspaze.com service API Documentation',
    },
    host: `localhost:${PORT}/v1`,
};

const outputFile = './swagger-output.json';
const routes = ['../../routes.js'];

swaggerAutogen(outputFile, routes, doc);