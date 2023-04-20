const Place = require('../model/Place')

const getAll = async(req, res)=>{
    //const {skip} = req.body
    const place = await Place.find().sort({'points': -1}).lean().limit(10).skip(0)
    res.json(place)
}
const getRent = async(req, res)=>{
    res.json('get rent')
}
const getHomeStay = async(req, res)=>{
    res.json('get home stay')
}
const getHostel = async(req, res)=>{
    res.json('get hostel')
}
const getHotel = async(req, res)=>{
    res.json('get hotel')
}
const getPg = async(req, res)=>{
    res.json('get pg')
}

module.exports = {getAll, getHomeStay, getHostel, 
    getHotel, getPg, getRent
}