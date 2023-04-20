const User = require('../model/User')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const registerUser = async (req, res)=>{
    const {email, phoneNumber} = req.body
    const emailAlreadyExists = await User.findOne({email}).lean()
    console.log('here',emailAlreadyExists)
    if(emailAlreadyExists){
        throw new BadRequestError('Email is in use')
    }
   
    const numberAlreadyExist = await User.findOne({phoneNumber}).lean()
    if(numberAlreadyExist){
        throw new BadRequestError('Phone number already in use')
    }
    const user = await User.create(req.body).lean()
    const accessToken = user.createAccessJWT()
    const refreshToken = user.createRefreshJWT()
    res.cookie('jwt', refreshToken, 
        // {
        // httpOnly: true, //accessible only by web server
        // // secure: true,//https
        // sameSite: 'None',//cross-site cookie
        // maxAge: 7 * 24 * 60 * 60 * 1000,//cookie expiry: set to macth rt
        // }
    )
    console.log('register-',req.cookies, refreshToken)
    res.status(200).json({accessToken, roles: user.roles, name: user.name})
}
const loginUser = async (req, res)=>{
    const {email, password} = req.body
    console.log(email, password)
    if(!email || !password){
        throw new BadRequestError('Please enter email and passowrd')
    }
    const user = await User.findOne({email}).lean()
    if(!user){
        throw new UnauthenticatedError('Incorrect email or password')
    }
    const isCorrectPassword = await user.comparePassword(password)
    if(!isCorrectPassword){
        throw new UnauthenticatedError('Incorrect Password')
    }
    const accessToken = user.createAccessJWT()
    const refreshToken = user.createRefreshJWT()
    res.cookie('jwt', refreshToken, 
        // {
        // //httpOnly: true, //accessible only by web server
        // //secure: true,//https
        // sameSite: 'None',//cross-site cookie
        // maxAge: 7 * 24 * 60 * 60 * 1000,//cookie epiry: set to macth rt
        // }
    )
    console.log('login-',req.cookies, refreshToken)
    res.status(200).json({accessToken, roles:user.roles, name: user.name})
}



module.exports = {registerUser, loginUser}