const User = require('../model/User')

const getUser  = async(req, res)=>{
    const {userId, name} = req.user
    const user = await User.findById(userId).select('-password')
    console.log('profile-',req.cookies)
    res.status(200).json(user)
}
const updateUser = async (req, res)=>{
    const {userId, name} = req.user
    const user = await User.findByIdAndUpdate(userId, req.body).select('-password')
    res.status(201).json(user)
}

const verify = async(req, res, next)=>{
    const authHeader = req.headers
    console.log(authHeader, req.cookies)
    next()
}

module.exports = {getUser,updateUser}