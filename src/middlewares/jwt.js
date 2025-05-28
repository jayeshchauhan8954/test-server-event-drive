const jwt = require('jsonwebtoken');
const { serviceResponse } = require('@src/utils/helpers/api_response');
const { _auth_module, _query } = require('@src/utils/constants/messages');
const { JWT_SECRET_KEY } = require('@config/index');
const { User } = require('@src/models/app/User');
const { _profileStatus, _UserType } = require('@src/utils/constants');
const { _handleCatchErrors } = require('@src/utils/helpers');


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {import('express').NextFunction} next 
 * @returns 
 */
const verifyJwtToken = function (req, res, next) {
    try {
        let token = req.cookies.token || req.headers.authorization?.split(" ")?.[1];

        if (token) {

            jwt.verify(token, JWT_SECRET_KEY, async function (err, decoded) {
                if (err) {
                    return res.status(401).json(new serviceResponse({ status: 401, errors: _auth_module.unAuth }));
                }
                else {
                    Object.entries(decoded).forEach(([key, value]) => {
                        req[key] = value
                    })
                    next();
                }
            });
        }
        else {
            return res.status(401).send(new serviceResponse({ status: 401, message: _auth_module.unAuth }));
        }
    } catch (error) {
        _handleCatchErrors(error, res)
    }
};


module.exports = {
    verifyJwtToken
}