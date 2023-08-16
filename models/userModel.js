const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const cookie = require('cookie')

//models
const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required: [true, 'UserName is Required']
    },
    email:{
        type: String,
        required: [true, "Email is required"]
    },
    password:{
        type:String,
        required: [true, "Password is Required"],
        minlength: [8, 'Password lenght should be 8 character long']
    },
    customerId: {
        type:String,
        default : ""
    },
    subscription:{
        type: String,
        default: ""
    }
})


//hashed password

userSchema.pre('save', async function (next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

//match password 
userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

//sign token
userSchema.methods.getSingedToken = function(res){
    const accessToken = JWT.sign({id:this._id}, process.env.JWT_SECRETE_KEY, {expiresIn: process.env.JWT_ACCESS_EXPIRESIN })
    const refressToken = JWT.sign({id:this._id}, process.env.JWT_REFRESS_TOKEN, {expiresIn: process.env.JWT_REFRESS_EXPIRESIN})

    res.cookie('refressToken', `${refressToken}`, {maxAge: 86400*7000, httpOnly: true})
}

const User = mongoose.model('User', userSchema)

module.exports = User;