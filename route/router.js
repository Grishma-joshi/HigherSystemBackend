const express= require("express")
const { register, login, service } = require("../controller/auth_controller")
const router  = express.Router()

//API url.....
router.post('/signup',register)
router.post('/login',login)
router.post('/service',service)
module.exports=router