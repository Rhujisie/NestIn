const User = require('../model/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const handleRefreshToken = async (req, res)=>{
    const {jwt:refreshToken} = req.cookies
    if(!refreshToken) throw new UnauthenticatedError('Authorization invalid')
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err) return res.status(403).json(err)
            const accessToken = jwt.sign(
                {userId: decoded.userId, 
                name: decoded.name
                }, 
                process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10s'}
            )
            res.status(200).json(accessToken)
        }
    )
}
module.exports = handleRefreshToken