const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

//Routes Paths
const authRoutes = require('./routes/authRoute');

dotenv.config()
 
connectDb();

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(errorHandler)

//API Routes
app.use('/api/v1/auth', authRoutes)

app.listen(8000, () => {
    console.log("Server runnig in 8000")
})