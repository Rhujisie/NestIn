const User = require('../model/User')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const registerUser = async (req, res)=>{
    const user = await User.findOne()
    const accessToken = user.createAccessJWT()
    const refreshToken = user.createRefreshJWT()
    res.cookie('jwt', refreshToken, 
        {
        httpOnly: true, //accessible only by web server
        // secure: true,//https
        sameSite: 'None',//cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000,//cookie expiry: set to macth rt
        }
    )
    res.status(200).json({accessToken})
}
const loginUser = async (req, res)=>{
    const {email, password} = req.body
    console.log(email, password)
    if(!email || !password){
        throw new BadRequestError('Please enter email and passowrd')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isCorrectPassword = await user.comparePassword(password)
    if(!isCorrectPassword){
        throw new UnauthenticatedError('Incorrect Password')
    }
    const accessToken = user.createAccessJWT()
    const refreshToken = user.createRefreshJWT()
    res.cookie('jwt', refreshToken, 
        {
        httpOnly: true, //accessible only by web server
        //secure: true,//https
        sameSite: 'None',//cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000,//cookie epiry: set to macth rt
        }
    )
    console.log('login-',req.cookies)
    res.status(200).json({accessToken})
}



module.exports = {registerUser, loginUser}