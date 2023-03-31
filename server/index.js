//dependencies
require('dotenv').config()
require('express-async-errors')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
//config
const corsOptions = require('./config/corsOptions')
//const credentials = require('./middleware/credential')


//routes
const userRouter = require('./routes/Auth')
const profileRouter = require('./routes/profile')
const refreshRouter = require('./routes/refresh')
const logoutRouter = require('./routes/logout')

//error handler middleware
const errorHandler = require('./middleware/errorHandler')
const notFoundHandler = require('./middleware/notFound')
const authenticationMiddleware = require('./middleware/authentication')

//connectDB
const connectDB = require('./connect')

//express
const express = require('express')
const app = express()

//dependencies middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
//app.use(credentials)
app.use(cors(corsOptions))

// app.use(rateLimit({
//     windowMs: 60 * 1000, // 1 min
//     max: 5,
//     message: {
//         message: 'Too many attempts from this IP, please try again after 60 seconds'
//     },
//     standardHeaders: true,
//     legacyHeaders: false,
// }))

const PORT = process.env.PORT || 3000

// routes
app.get('/', (req, res)=>{
    res.send('Hello there mother fucker')
})
app.use('/api/v1', userRouter)
app.use('/api/v1/refresh', refreshRouter)
app.use('/api/v1/logout', logoutRouter)
app.use('/api/v1',authenticationMiddleware, profileRouter)
//error handler middleware
app.use(notFoundHandler)
app.use(errorHandler)
//connect to DB
const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, ()=>{
            console.log(`Server is listening on port ${PORT}`)
        })
    }catch(err){
        console.log(err)
    }
}

start()