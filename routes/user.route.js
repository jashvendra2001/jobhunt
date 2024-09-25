import express from "express"
import { register,login,logout, updateProfile } from "../controller/user.controller.js"
import isAuthenticate from "../middleware/isAuthenticate.js"

const router= express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/update/Profile").post(isAuthenticate,updateProfile)




export default router