const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        trim: true,
        unique: [true, 'Email is in use'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    phoneNumber: {
        type: Number,
        unique: [true, 'Phone number in use'],
        required: [true, 'Please enter Phone Number'],   
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        trim: true,
    }
})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password)
}

UserSchema.methods.createAccessJWT = function(){
    return jwt.sign({userId: this._id, name: this.name}, 
        process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10s'})
}
UserSchema.methods.createRefreshJWT = function(){
    return jwt.sign({userId: this._id, name: this.name}, 
        process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30s'})
}
module.exports = mongoose.model('User', UserSchema)