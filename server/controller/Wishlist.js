const Wishlist = require('../model/Wishlist')
const Place = require('../model/Place')

const getWishlistPlaces = async(req, res)=>{
    const {userId} = req.user
    const wishlist = await Wishlist.findOne({userID: userId})
    const result = []
    for(let i = 0; i < wishlist.placeID.length; i++){
        const place = await Place.findById(wishlist.placeID[i]).lean()
        result.push(place)
    }
    res.status(200).json(result)
}
const getWishlist = async(req, res)=>{
    const {userId} = req.user
    const {placeID} = await Wishlist.findOne({userID: userId}).lean()
    res.status(200).json(placeID)
}
const createWishlist  = async(req, res)=>{
    const {id} = req.body
    const {userId} = req.user
    const wishlist = await Wishlist.create({userID: userId, placeID: id}).lean()
    res.json(wishlist)
}

const updateWishlist = async(req, res)=>{
    const {userId} = req.user
    const {id} = req.params
    const wishlist = await Wishlist.findOne({userID: userId})
    const index = wishlist.placeID.indexOf(id)
    if(index > -1){
        wishlist.placeID.splice(index, 1)
    }else{
        wishlist.placeID.push(id)
    }
    console.log(wishlist.placeID)
    await wishlist.save()
    res.json(wishlist)
}

module.exports = {getWishlistPlaces, getWishlist, createWishlist, updateWishlist}