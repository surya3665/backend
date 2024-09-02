const router = require("express").Router()
const userRouter = require("./user.route")
const songRouter = require("./song.route")

router.use("/user", userRouter)
router.use("/song",songRouter)

module.exports = router