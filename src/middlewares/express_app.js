const { serviceResponse } = require("@src/utils/helpers/api_response")

module.exports = {
    handleCatchError: (err, req, res, next) => {
        try {
            let { status, error } = JSON.parse(err)
            // Your Error Handling Here
            return res.send(new serviceResponse({ status: status, errors: [{ message: error }] }))
        } catch (err) {
            return res.send(new serviceResponse({ status: 500, errors: [{ message: err.message }] }))
        }
    },

    handleRouteNotFound: (req, res) => {
        try {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "Route not found." }] }))
        } catch (err) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: err.message }] }))
        }
    },

    handlePagination: (req, res, next) => {
        try {
            let maxLimit = 20;
            let { limit, page, paginate = 1 } = req.query;
            let offset = 0;
            if (limit && page) {
                limit = limit <= maxLimit ? limit : maxLimit
                offset = (page - 1) * limit
            }
            req.query.limit = limit ? parseInt(limit) : 10;
            req.query.page = page ? parseInt(page) : 1;
            req.query.offset = offset ? parseInt(offset) : 0;
            req.query.paginate = paginate == 0 ? 0 : 1;
            next();
        } catch (err) {
            return res.send(new serviceResponse({ status: 404, errors: err.message }))
        }
    },
}
