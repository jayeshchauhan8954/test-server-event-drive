const { validateErrors } = require("@src/utils/helpers/express_validator");
const { body } = require("express-validator");

/**
 * @param {"payment"} type
 */
exports.paymentValSchema = (type) => {
    switch (type) {
        case "payment":
            return [
                body("to", "Recipient email can't be null").notEmpty().isEmail().withMessage("Recipient email is not in a valid format").trim(),
                body("from", "ETH or BTC can't be null").notEmpty().trim(),
                body("amount", "Amount can't be null").notEmpty().isFloat({ gt: 0 }).withMessage("Amount must be a positive number"),
                body("description", "Description must be a string").optional().isString().trim(),
                validateErrors,
            ];
    }
};
