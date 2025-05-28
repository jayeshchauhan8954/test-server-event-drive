const { validateErrors } = require("@src/utils/helpers/express_validator");
const { body } = require("express-validator");

/**
 * @param {"login"|"register"} type
 */
exports.UserValSchema = (type) => {
  switch (type) {
    case "register":
      return [
        body("name", "Name can't be null").notEmpty().isString().not().trim(),
        body("email", "email can't be null").notEmpty().isEmail().not().withMessage("email is not in valid format").trim(),
        body("password", "password can't be null").notEmpty().trim(),
        validateErrors,
      ];
    case "login":
      return [
        body("email", "email can't be null").notEmpty().trim(),
        body("password", "password can't be null").notEmpty().trim(),
        validateErrors,
      ];
  }
};
