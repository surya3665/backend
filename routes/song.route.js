const router = require("express").Router()
const protectRoute = require("../middleware/user.middleware")
const songController = require("./controllers/song.controllers")

router.get("/song",protectRoute,songController)
module.exports=router