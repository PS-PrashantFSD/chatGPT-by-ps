const mongoose = require("mongoose")
const colors = require("colors")

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to MongoDb ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`Mongodb Database Erro ${error}`.bgRed.white)
    }
}

module.exports =  connectDb;