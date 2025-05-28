const { User } = require("@src/models/app/User");
const { _profileStatus } = require("@src/utils/constants");
const {
  _query,
  _auth_module,
  _response_message,
} = require("@src/utils/constants/messages");
const { _handleCatchErrors } = require("@src/utils/helpers");
const { serviceResponse } = require("@src/utils/helpers/api_response");
const { generateJwtToken } = require("@src/utils/helpers/jwt");
const bcrypt = require("bcryptjs");



module.exports.register = async (req, res) => {
  // #swagger.tags = ['user auth']
  try {
    let { name, email, password, } = req.body;

    email = email?.trim()?.toLowerCase();

    const existingUser = await User.findOne({ email, deletedAt: null });

    if (existingUser) {
      return res.status(403).send(new serviceResponse({ status: 403, errors: [{ message: _response_message.allReadyExist("Email") }] }));
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).send(new serviceResponse({ status: 201, data: newUser, message: "User registered successfully", })
    );
  } catch (error) {
    _handleCatchErrors(error, res);
  }
};

module.exports.login = async (req, res) => {
  // #swagger.tags = ['user auth']
  try {
    let { email, password } = req.body;
    email = email?.trim()?.toLowerCase();
    const user = await User.findOne({ email, status: _profileStatus.Active, deletedAt: null }).select(`+password`);

    if (!user) {
      return res.status(401).json({ message: _query.notFound("User") });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {

      return res.status(400).send(new serviceResponse({ status: 400, errors: [{ message: _query.invalid("Credentials") }], })
      );

    }
    delete user._doc.password;
    delete user._doc.updatedAt;

    user._doc.userId = user?._doc._id;
    const token = generateJwtToken(user._doc);
    user._doc.token = token;
    res.cookie("token", token, {
      httpOnly: true, secure: false, maxAge: 84000,
    });
    res.status(200).send(new serviceResponse({ status: 200, data: user, message: _auth_module.login(), })
    );
  } catch (error) {
    _handleCatchErrors(error, res);
  }
};

module.exports.logout = async (req, res) => {
  // #swagger.tags = ['user auth']
  try {
    res.clearCookie("token");
    return res.status(200).send(new serviceResponse({ status: 200, message: _auth_module.logout() }));
  } catch (error) {
    _handleCatchErrors(error, res);
  }
};
