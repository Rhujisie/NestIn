const express = require('express')
const router = express.Router()

const {getAll, getHomeStay, getHostel, 
    getHotel, getPg, getRent
} = require('../controller/MainPlace')

router.get('/all',getAll)
router.get('/rent',getRent)
router.get('/homestay',getHomeStay)
router.get('/hostel',getHostel)
router.get('/hotel',getHotel)
router.get('/pg',getPg)

module.exports = router