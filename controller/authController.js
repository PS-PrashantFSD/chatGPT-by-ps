const userModel = require('../models/userModel');
const errorResponse = require('../utils/errorResponse');

// JWT Token
exports.sendToken = (user, statusCode, res) => {
    const token = user.getSingedToken(res);
    res.status(statusCode).json({
        success: true,
        token
    });
};

// Register
exports.registerController = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      //exisitng user
      const exisitingEmail = await userModel.findOne({ email });
      if (exisitingEmail) {
        return next(new errorResponse("Email is already register", 500));
      }
      const user = await userModel.create({ username, email, password });
      this.sendToken(user, 201, res);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

// LOGIN
exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return next(new errorResponse('Please provide Email & Password'));
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return next(new errorResponse('Invalid credential', 401));
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new errorResponse('Invalid credential', 401));
        }

        // Response
        this.sendToken(user, 200, res); // Changed from "sendToken" to "exports.sendToken"
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// logout
exports.logoutController = async (req, res) => {
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message: 'Logout Successfully'
    });
};
