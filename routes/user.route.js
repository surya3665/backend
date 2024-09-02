const router = require("express").Router()
const { test, signupController, logoutController, loginController } = require("./controllers/user.controllers")

router.get("/", test)
router.post("/v1/signup", signupController)
router.post("/v1/logout",logoutController)
router.post("/v1/login",loginController)
module.exports = router