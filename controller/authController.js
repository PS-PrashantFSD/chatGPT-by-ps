const userModel = require('../models/userModel')
const errorResponse = require('../utils/errorResponse')

//JWT Token
exports.sendToken = (user, statusCode, res) => {
    const token = user.getSingedToken(res)
    res.status(statusCode).json({
        success: true,
        token
    })
}
//Register
exports.registerController = async (req, res , next) => {
    try {
        const {username, email, password } = req.body
        const existingEmail = await userModel.findOne({email})
        if(existingEmail){
            return next(new errorResponse('Email is alreday registered', 500))
        }

        const user = await userModel.create({username, email, passsword})
        sendToken(user, 201, res)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

//LOGIN
exports.loginController = async (req, res, next) => {
    try {
        const {email, password} = req.body

        // validation 
        if(!email || !password){
            return next( new errorResponse('Please provide Email & Password'))
        }
        const user =await userModel.findOne({email})
        if(!user){
            return next(new errorResponse('Invalid credential', 401))
        }
        const isMatch = await userModel.matchPassword(password)
        if(!isMatch){
            return next(new errorResponse('Invalid credential', 401))
        }

        //res
        sendToken(user, 200, res)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

//logout
exports.logoutController = async (req, res) => {
    res.clearCookie('refreshToken')
    return res.status(200).json({
        success: true,
        message: 'Logout Succefully'
    })
}